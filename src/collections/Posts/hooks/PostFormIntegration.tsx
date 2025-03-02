'use client';

import React, { useEffect } from 'react';

// Simple component that reads from sessionStorage and populates form on page load
const PostFormIntegration: React.FC = () => {
  useEffect(() => {
    // Only run once when the component mounts
    const loadNotionContent = () => {
      try {
        if (typeof window === 'undefined') return;
        
        // Check if we have Notion content in sessionStorage
        const notionContent = sessionStorage.getItem('notionImportContent');
        const notionImages = sessionStorage.getItem('notionImportImages');
        
        if (notionContent) {
          const lexicalContent = JSON.parse(notionContent);
          
          // Find form fields in the DOM
          setTimeout(() => {
            // Set content in form fields - this would need to be adjusted based on your form structure
            if (window.document.querySelector('form')) {
              // Extract title from the first heading if available
              if (lexicalContent.root && 
                  lexicalContent.root.children && 
                  lexicalContent.root.children.length > 0) {
                
                const firstNode = lexicalContent.root.children[0];
                if (firstNode.type === 'heading' && firstNode.children.length > 0) {
                  const titleText = firstNode.children[0].text;
                  const titleInput = window.document.querySelector('input[name="title"]');
                  if (titleInput) {
                    (titleInput as HTMLInputElement).value = titleText;
                    // Trigger change event
                    const event = new Event('input', { bubbles: true });
                    titleInput.dispatchEvent(event);
                  }
                }
              }
            }
          }, 500);
          
          // Clear the sessionStorage to prevent duplicate imports
          sessionStorage.removeItem('notionImportContent');
          sessionStorage.removeItem('notionImportImages');
          
          console.log('Set up Notion content to be loaded once form is ready');
        }
      } catch (error) {
        console.error('Error loading Notion content:', error);
      }
    };
    
    loadNotionContent();
  }, []);

  return null; // This component doesn't render anything
};

export default PostFormIntegration; 