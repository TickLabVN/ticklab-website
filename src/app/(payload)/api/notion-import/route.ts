import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '../../../../utilities/getPayload';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
import { convertMarkdownToLexical, processImageReferences } from '../../../../endpoints/notion-import/markdownToLexical';
import { Readable } from 'stream';

// Disable body parsing, we'll handle it ourselves with formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

// This is a Next.js API route handler for Notion import
export async function POST(req: NextRequest) {
  try {
    // Get the payload client
    const payload = await getPayloadClient();

    // Create a temporary directory for file uploads if it doesn't exist
    const tempDir = path.join(process.cwd(), 'temp');
    try {
      await fs.mkdir(tempDir, { recursive: true });
    } catch (error) {
      console.error('Error creating temp directory:', error);
    }

    // Parse the form data using formidable
    const form = formidable({
      multiples: true,
      uploadDir: tempDir,
      keepExtensions: true,
      allowEmptyFiles: false,
    });

    // Convert the NextRequest to a format that formidable can process
    // Create a readable stream from the request body
    const formData = await req.formData();
    
    // Process the FormData
    const files: { markdown?: any, images?: any[] } = {};
    
    // Extract files from FormData
    for (const [name, value] of formData.entries()) {
      if (value instanceof File) {
        // Create a temporary file path
        const filePath = path.join(tempDir, value.name);
        // Write the file to disk
        const buffer = Buffer.from(await value.arrayBuffer());
        await fs.writeFile(filePath, buffer);
        
        // Store the file info
        if (name === 'markdown') {
          files.markdown = {
            filepath: filePath,
            originalFilename: value.name,
            mimetype: value.type,
            size: value.size
          };
        } else if (name === 'images') {
          if (!files.images) files.images = [];
          files.images.push({
            filepath: filePath,
            originalFilename: value.name,
            mimetype: value.type,
            size: value.size
          });
        }
      }
    }

    // Check if markdown file was uploaded
    if (!files.markdown) {
      return NextResponse.json({ error: 'No Markdown file uploaded' }, { status: 400 });
    }

    // Read the markdown file
    const markdownFile = files.markdown;
    const markdownContent = await fs.readFile(markdownFile.filepath, 'utf-8');

    // Process any images that were uploaded
    let uploadedImages = [];
    if (files.images && files.images.length > 0) {
      uploadedImages = await processImages(files.images, payload);
    }

    // Process image references in the markdown content
    const processedMarkdown = processImageReferences(markdownContent, uploadedImages);

    // Convert the processed markdown to Lexical format
    const lexicalContent = await convertMarkdownToLexical(processedMarkdown);

    // Clean up temporary files
    try {
      if (markdownFile && markdownFile.filepath) {
        await fs.unlink(markdownFile.filepath);
      }
      
      if (files.images && files.images.length > 0) {
        for (const file of files.images) {
          if (file.filepath) {
            await fs.unlink(file.filepath);
          }
        }
      }
    } catch (error) {
      console.error('Error cleaning up temporary files:', error);
    }

    // Return the lexical content
    return NextResponse.json({
      success: true,
      message: 'Markdown converted to Lexical format successfully',
      lexicalContent,
      uploadedImages,
    });
  } catch (error) {
    console.error('Error importing from Notion:', error);
    return NextResponse.json(
      { error: 'Failed to import from Notion', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Function to process uploaded images
async function processImages(imageFiles: any[], payload: any) {
  const uploadedImages = [];

  for (const imageFile of imageFiles) {
    try {
      // Read the file content into a buffer
      const fileBuffer = await fs.readFile(imageFile.filepath);
      
      // Create a media item in Payload CMS
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: imageFile.originalFilename || 'Imported from Notion',
        },
        // For S3 storage, we need to provide the file data in a specific format
        file: {
          data: fileBuffer, // The file buffer
          size: imageFile.size,
          name: imageFile.originalFilename,
          mimetype: imageFile.mimetype,
        },
      });

      uploadedImages.push(media);
    } catch (error) {
      console.error('Error uploading image:', error, error instanceof Error ? error.stack : '');
    }
  }

  return uploadedImages;
} 