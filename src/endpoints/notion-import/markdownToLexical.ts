import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

// This file contains utilities to convert Markdown to Lexical format

// Basic Lexical node types
type TextFormatType = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'subscript' | 'superscript' | 'code' | 'highlight';
type TextNode = {
    type: 'text';
    text: string;
    format?: number;
    style?: string;
    mode?: 'normal' | 'token' | 'segmented';
    detail?: number;
    version: 1;
};

type ParagraphNode = {
    type: 'paragraph';
    children: Array<TextNode>;
    direction: null;
    format: string;
    indent: number;
    version: 1;
};

type HeadingNode = {
    type: 'heading';
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children: Array<TextNode>;
    direction: null;
    format: string;
    indent: number;
    version: 1;
};

type ListItemNode = {
    type: 'listitem';
    children: Array<ParagraphNode | ListNode>;
    value: number | undefined;
    checked: boolean | undefined;
    version: 1;
};

type ListNode = {
    type: 'list';
    listType: 'bullet' | 'number' | 'check';
    children: Array<ListItemNode>;
    version: 1;
};

type QuoteNode = {
    type: 'quote';
    children: Array<ParagraphNode>;
    direction: null;
    format: string;
    indent: number;
    version: 1;
};

type CodeBlockNode = {
    type: 'code';
    children: Array<TextNode>;
    language: string | undefined;
    direction: null;
    format: string;
    indent: number;
    version: 1;
};

type LexicalNode = TextNode | ParagraphNode | HeadingNode | ListNode | ListItemNode | QuoteNode | CodeBlockNode;

type LexicalContent = {
    root: {
        children: Array<LexicalNode>;
        direction: null;
        format: string;
        indent: number;
        type: 'root';
        version: 1;
    };
};

// Format mapping for text styles
const TEXT_FORMAT_MAP: Record<TextFormatType, number> = {
    bold: 1,
    italic: 2,
    underline: 4,
    strikethrough: 8,
    code: 16,
    subscript: 32,
    superscript: 64,
    highlight: 128,
};

// Helper function to create a text node
const createTextNode = (text: string, format: number = 0): TextNode => ({
    type: 'text',
    text,
    format,
    style: '',
    mode: 'normal',
    detail: 0,
    version: 1,
});

// Helper function to create a paragraph node
const createParagraphNode = (children: Array<TextNode>): ParagraphNode => ({
    type: 'paragraph',
    children,
    direction: null,
    format: '',
    indent: 0,
    version: 1,
});

// Helper function to create a heading node
const createHeadingNode = (tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', children: Array<TextNode>): HeadingNode => ({
    type: 'heading',
    tag,
    children,
    direction: null,
    format: '',
    indent: 0,
    version: 1,
});

// Helper function to create a list node
const createListNode = (listType: 'bullet' | 'number' | 'check', children: Array<ListItemNode>): ListNode => ({
    type: 'list',
    listType,
    children,
    version: 1,
});

// Helper function to create a list item node
const createListItemNode = (
    children: Array<ParagraphNode | ListNode>,
    value?: number,
    checked?: boolean
): ListItemNode => ({
    type: 'listitem',
    children,
    value,
    checked,
    version: 1,
});

// Helper function to create a quote node
const createQuoteNode = (children: Array<ParagraphNode>): QuoteNode => ({
    type: 'quote',
    children,
    direction: null,
    format: '',
    indent: 0,
    version: 1,
});

// Helper function to create a code block node
const createCodeBlockNode = (children: Array<TextNode>, language?: string): CodeBlockNode => ({
    type: 'code',
    children,
    language,
    direction: null,
    format: '',
    indent: 0,
    version: 1,
});

// Main function to convert markdown to Lexical format
export async function convertMarkdownToLexical(markdown: string): Promise<LexicalContent> {
    // Parse the markdown content
    const processor = unified()
        .use(remarkParse) // Parse markdown to mdast
        .use(remarkRehype) // Convert mdast to hast
        .use(rehypeStringify); // Convert hast to HTML string

    // Process the markdown to HTML first
    const htmlContent = await processor.process(markdown);

    // Create a basic Lexical structure
    const lexicalContent: LexicalContent = {
        root: {
            children: [],
            direction: null,
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
        },
    };

    // For now, we'll implement a simple conversion that handles basic elements
    // In a real implementation, you would need to properly parse the HTML
    // and create the appropriate Lexical nodes

    // Split the markdown by lines to process it
    const lines = markdown.split('\n');
    let currentIndex = 0;

    while (currentIndex < lines.length) {
        const line = lines[currentIndex]?.trim() ?? '';

        // Handle headings
        if (line.startsWith('#')) {
            const headingMatch = line.match(/^#+/);
            const headingLevel = headingMatch ? headingMatch[0].length : 0;
            if (headingLevel <= 6) {
                const headingText = line.replace(/^#+\s+/, '');
                const tag = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
                lexicalContent.root.children.push(
                    createHeadingNode(tag, [createTextNode(headingText)])
                );
            }
        }
        // Handle paragraphs
        else if (line !== '') {
            lexicalContent.root.children.push(
                createParagraphNode([createTextNode(line)])
            );
        }

        currentIndex++;
    }

    // If no content was processed, add a default paragraph
    if (lexicalContent.root.children.length === 0) {
        lexicalContent.root.children.push(
            createParagraphNode([createTextNode('Imported from Notion')])
        );
    }

    return lexicalContent;
}

// Function to process image references in markdown
export function processImageReferences(markdown: string, uploadedImages: any[]): string {
    // Create a map of image filenames to their URLs
    const imageMap = new Map();
    uploadedImages.forEach(image => {
        if (image.filename) {
            imageMap.set(image.filename, image.url);
        }
    });

    // Replace image references in the markdown
    let processedMarkdown = markdown;

    // Match Markdown image syntax: ![alt text](image.png)
    const imageRegex = /!\[(.*?)\]\(([^)]+)\)/g;
    processedMarkdown = processedMarkdown.replace(imageRegex, (match, alt, src) => {
        // Get the filename from the path
        const filename = src.split('/').pop();

        // If we have this image in our uploaded images, replace with the new URL
        if (imageMap.has(filename)) {
            return `![${alt}](${imageMap.get(filename)})`;
        }

        // Otherwise keep the original
        return match;
    });

    return processedMarkdown;
}