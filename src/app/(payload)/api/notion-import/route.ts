import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '../../../../utilities/getPayload';
import { convertMarkdownToLexical, processImageReferences } from '../../../../endpoints/notion-import/markdownToLexical';

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

    // Parse the form data
    const formData = await req.formData();
    
    // Process the FormData
    const files: { markdown?: { buffer: Buffer, name: string, type: string, size: number }, images?: Array<{ buffer: Buffer, name: string, type: string, size: number }> } = {};
    
    // Extract files from FormData
    for (const [name, value] of formData.entries()) {
      if (value instanceof File) {
        // Convert file to buffer
        const buffer = Buffer.from(await value.arrayBuffer());
        
        // Store the file info
        if (name === 'markdown') {
          files.markdown = {
            buffer,
            name: value.name,
            type: value.type,
            size: value.size
          };
        } else if (name === 'images') {
          if (!files.images) files.images = [];
          files.images.push({
            buffer,
            name: value.name,
            type: value.type,
            size: value.size
          });
        }
      }
    }

    // Check if markdown file was uploaded
    if (!files.markdown) {
      return NextResponse.json({ error: 'No Markdown file uploaded' }, { status: 400 });
    }

    // Read the markdown content from buffer
    const markdownContent = files.markdown.buffer.toString('utf-8');

    // Process any images that were uploaded
    let uploadedImages = [];
    if (files.images && files.images.length > 0) {
      uploadedImages = await processImages(files.images, payload);
    }

    // Process image references in the markdown content
    const processedMarkdown = processImageReferences(markdownContent, uploadedImages);

    // Convert the processed markdown to Lexical format
    const lexicalContent = await convertMarkdownToLexical(processedMarkdown);

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
async function processImages(imageFiles: Array<{ buffer: Buffer, name: string, type: string, size: number }>, payload: any) {
  const uploadedImages = [];

  for (const imageFile of imageFiles) {
    try {
      // Create a media item in Payload CMS with S3 storage
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: imageFile.name || 'Imported from Notion',
          fileType: 'image',
        },
        file: {
          data: imageFile.buffer,
          size: imageFile.size,
          name: imageFile.name,
          mimetype: imageFile.type,
        },
      });

      uploadedImages.push(media);
    } catch (error) {
      console.error('Error uploading image:', error, error instanceof Error ? error.stack : '');
    }
  }

  return uploadedImages;
} 