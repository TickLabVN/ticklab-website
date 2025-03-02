'use client';

import { useEffect } from 'react';

// This hook is used to populate the post creation form with content from a Notion import
const usePopulateNotionContent = (form: any) => {
  useEffect(() => {
    // Only run once when the component mounts
    const loadNotionContent = () => {
      try {
        // Check if we have Notion content in sessionStorage
        const notionContent = sessionStorage.getItem('notionImportContent');
        const notionImages = sessionStorage.getItem('notionImportImages');
        
        if (notionContent) {
          const lexicalContent = JSON.parse(notionContent);
          
          // Get any hero image if available
          if (notionImages) {
            const images = JSON.parse(notionImages);
            if (images && images.length > 0) {
              // Use the first image as hero image
              const heroImage = images[0];
              form.setValue('heroImage', heroImage.id);
            }
          }
          
          // Set the content in the form
          form.setValue('content', lexicalContent);
          
          // Extract title from the first heading if available
          if (lexicalContent.root && 
              lexicalContent.root.children && 
              lexicalContent.root.children.length > 0) {
            
            const firstNode = lexicalContent.root.children[0];
            if (firstNode.type === 'heading' && firstNode.children.length > 0) {
              const titleText = firstNode.children[0].text;
              form.setValue('title', titleText);
            }
          }
          
          // Clear the sessionStorage to prevent duplicate imports
          sessionStorage.removeItem('notionImportContent');
          sessionStorage.removeItem('notionImportImages');
          
          // Show a success message
          console.log('Populated form with Notion content');
        }
      } catch (error) {
        console.error('Error loading Notion content:', error);
      }
    };
    
    loadNotionContent();
  }, [form]);
};

export default usePopulateNotionContent; 