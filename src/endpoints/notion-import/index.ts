import { Endpoint, PayloadHandler } from 'payload';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import type { PayloadRequest } from 'payload';
import formidable from 'formidable';
import { convertMarkdownToLexical, processImageReferences } from './markdownToLexical';
import { IncomingMessage } from 'http';

// This is a custom endpoint to handle Notion import
// It accepts a Markdown file and associated images
// and converts them to Lexical editor format

const notionImport: Endpoint = {
    path: '/notion-import',
    method: 'post',
    handler: async (req: PayloadRequest) => {
        try {
            // Use formidable to parse the multipart form data
            const form = formidable({ multiples: true, keepExtensions: true, allowEmptyFiles: false });

            // Create a promise to parse the form
            // In Payload, the PayloadRequest object is an extension of Express's Request object
            const formData = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
                form.parse(req as unknown as IncomingMessage, (err, fields, files) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve({ fields, files });
                });
            });

            const { fields, files } = formData as any;

            // Check if markdown file was uploaded
            if (!files.markdown) {
                return new Response(JSON.stringify({ error: 'No Markdown file uploaded' }), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            // Read the markdown file
            const markdownFile = files.markdown;
            const markdownContent = fs.readFileSync(markdownFile.filepath, 'utf-8');

            // Process any images that were uploaded first
            let uploadedImages = [];
            if (files.images) {
                const imageFiles = Array.isArray(files.images) ? files.images : [files.images];
                uploadedImages = await processImages(imageFiles, req.payload);
            }

            // Process image references in the markdown content
            const processedMarkdown = processImageReferences(markdownContent, uploadedImages);

            // Convert the processed markdown to Lexical format
            const lexicalContent = await convertMarkdownToLexical(processedMarkdown);

            // Return the processed content
            return new Response(JSON.stringify({
                message: 'Import successful',
                lexicalContent,
                uploadedImages
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        } catch (error) {
            console.error('Error importing from Notion:', error);
            return new Response(JSON.stringify({ error: 'Failed to import from Notion' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }
};

// Function to process uploaded images
async function processImages(imageFiles: any[], payload: any) {
    const uploadedImages = [];

    for (const imageFile of imageFiles) {
        try {
            // Create a media item in Payload CMS
            const media = await payload.create({
                collection: 'media',
                data: {
                    alt: imageFile.originalFilename || 'Imported from Notion',
                },
                file: {
                    path: imageFile.filepath,
                    filename: imageFile.originalFilename,
                    mimeType: imageFile.mimetype,
                },
            });

            uploadedImages.push(media);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    return uploadedImages;
}

export default notionImport;