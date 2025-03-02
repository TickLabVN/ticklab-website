import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This hook will check if there's any imported Notion content in localStorage
// and apply it to the editor when creating a new post
const useNotionImport = (editor: any) => {
  const router = useRouter();

  useEffect(() => {
    // Check if we're on the create page and if there's imported content
    const notionContent = localStorage.getItem('notionImportContent');
    const notionImages = localStorage.getItem('notionImportImages');

    if (notionContent) {
      try {
        // Parse the content
        const lexicalContent = JSON.parse(notionContent);
        const uploadedImages = notionImages ? JSON.parse(notionImages) : [];

        // Apply the content to the editor
        // This assumes the editor has a setEditorState method
        if (editor && editor.setEditorState) {
          editor.setEditorState(lexicalContent);

          // Clear the localStorage after applying
          localStorage.removeItem('notionImportContent');
          localStorage.removeItem('notionImportImages');

          // Show a success message
          console.log('Successfully loaded content from Notion import');
        }
      } catch (error) {
        console.error('Error applying Notion import content:', error);
      }
    }
  }, [editor]);
};

export default useNotionImport;