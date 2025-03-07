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
        .use(() => (tree) => {
            // Process the markdown AST
            visit(tree, (node: any) => {
                if (node.type === 'image') {
                    // Convert image nodes to Lexical image blocks
                    node.type = 'paragraph';
                    node.children = [{
                        type: 'text',
                        value: `![${node.alt || ''}](${node.url})`,
                    }];
                }
            });
            return tree;
        })
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

    // Split the markdown by lines to process it
    const lines = markdown.split('\n');
    let currentIndex = 0;
    let inCodeBlock = false;
    let codeBlockLanguage = '';
    let codeBlockContent: string[] = [];
    let inQuoteBlock = false;
    let quoteContent: string[] = [];
    let inList = false;
    let listType: 'bullet' | 'number' | 'check' = 'bullet';
    let listItems: string[] = [];

    while (currentIndex < lines.length) {
        const line = lines[currentIndex]?.trim() ?? '';

        // Handle code blocks
        if (line.startsWith('```')) {
            if (!inCodeBlock) {
                inCodeBlock = true;
                codeBlockLanguage = line.slice(3).trim();
                codeBlockContent = [];
            } else {
                // End of code block
                inCodeBlock = false;
                lexicalContent.root.children.push(
                    createCodeBlockNode(
                        [createTextNode(codeBlockContent.join('\n'))],
                        codeBlockLanguage
                    )
                );
                codeBlockContent = [];
            }
        }
        // Inside code block
        else if (inCodeBlock) {
            codeBlockContent.push(line);
        }
        // Handle blockquotes
        else if (line.startsWith('>')) {
            if (!inQuoteBlock) {
                inQuoteBlock = true;
            }
            quoteContent.push(line.slice(1).trim());
        }
        // End of blockquote
        else if (inQuoteBlock && line === '') {
            inQuoteBlock = false;
            lexicalContent.root.children.push(
                createQuoteNode([
                    createParagraphNode([createTextNode(quoteContent.join('\n'))])
                ])
            );
            quoteContent = [];
        }
        // Handle lists
        else if (line.match(/^[*+-]\s/) || line.match(/^\d+\.\s/) || line.match(/^- \[[ x]\]\s/)) {
            if (!inList) {
                inList = true;
                // Determine list type
                if (line.match(/^\d+\.\s/)) {
                    listType = 'number';
                } else if (line.match(/^- \[[ x]\]\s/)) {
                    listType = 'check';
                } else {
                    listType = 'bullet';
                }
            }
            
            // Process list item
            let itemText = line;
            if (listType === 'bullet') {
                itemText = line.replace(/^[*+-]\s/, '');
            } else if (listType === 'number') {
                itemText = line.replace(/^\d+\.\s/, '');
            } else {
                itemText = line.replace(/^- \[[ x]\]\s/, '');
            }
            listItems.push(itemText);
        }
        // End of list
        else if (inList && line === '') {
            inList = false;
            const items = listItems.map(text => 
                createListItemNode(
                    [createParagraphNode([createTextNode(text)])],
                    listType === 'number' ? 1 : undefined,
                    listType === 'check' ? false : undefined
                )
            );
            lexicalContent.root.children.push(createListNode(listType, items));
            listItems = [];
        }
        // Handle headings
        else if (line.startsWith('#')) {
            const headingMatch = line.match(/^(#+)\s+(.+)$/);
            if (headingMatch && headingMatch[1] && headingMatch[2]) {
                const level = headingMatch[1].length;
                const text = headingMatch[2];
                if (level <= 6) {
                    const tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
                    lexicalContent.root.children.push(
                        createHeadingNode(tag, [createTextNode(text)])
                    );
                }
            }
        }
        // Handle paragraphs with inline formatting
        else if (line !== '') {
            // Process inline formatting
            const segments = processInlineFormatting(line);
            lexicalContent.root.children.push(
                createParagraphNode(segments)
            );
        }

        currentIndex++;
    }

    // Handle any remaining blocks
    if (inQuoteBlock && quoteContent.length > 0) {
        lexicalContent.root.children.push(
            createQuoteNode([
                createParagraphNode([createTextNode(quoteContent.join('\n'))])
            ])
        );
    }

    if (inList && listItems.length > 0) {
        const items = listItems.map(text => 
            createListItemNode(
                [createParagraphNode([createTextNode(text)])],
                listType === 'number' ? 1 : undefined,
                listType === 'check' ? false : undefined
            )
        );
        lexicalContent.root.children.push(createListNode(listType, items));
    }

    // If no content was processed, add a default paragraph
    if (lexicalContent.root.children.length === 0) {
        lexicalContent.root.children.push(
            createParagraphNode([createTextNode('Imported from Notion')])
        );
    }

    return lexicalContent;
}

// Helper function to process inline formatting
function processInlineFormatting(text: string): TextNode[] {
    const nodes: TextNode[] = [];
    let currentText = '';
    let format = 0;
    
    // Process bold, italic, code, etc.
    const segments = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|~~.*?~~)/g);
    
    for (const segment of segments) {
        if (!segment) continue;
        
        if (segment.startsWith('**') && segment.endsWith('**')) {
            // Bold
            nodes.push(createTextNode(segment.slice(2, -2), TEXT_FORMAT_MAP.bold));
        } else if (segment.startsWith('*') && segment.endsWith('*')) {
            // Italic
            nodes.push(createTextNode(segment.slice(1, -1), TEXT_FORMAT_MAP.italic));
        } else if (segment.startsWith('`') && segment.endsWith('`')) {
            // Inline code
            nodes.push(createTextNode(segment.slice(1, -1), TEXT_FORMAT_MAP.code));
        } else if (segment.startsWith('~~') && segment.endsWith('~~')) {
            // Strikethrough
            nodes.push(createTextNode(segment.slice(2, -2), TEXT_FORMAT_MAP.strikethrough));
        } else {
            // Plain text
            nodes.push(createTextNode(segment));
        }
    }
    
    return nodes;
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
        const filename = src ? src.split('/').pop() : '';

        // If we have this image in our uploaded images, replace with the new URL
        if (filename && imageMap.has(filename)) {
            const newUrl = imageMap.get(filename);
            if (newUrl) {
                return `![${alt}](${newUrl})`;
            }
        }

        // Otherwise keep the original
        return match;
    });

    return processedMarkdown;
}