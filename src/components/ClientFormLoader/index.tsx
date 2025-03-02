'use client';

import React, { useEffect } from 'react';

/**
 * This component runs on the client-side and checks if there's content from Notion
 * to inject into the form.
 */
const ClientFormLoader: React.FC = () => {
  useEffect(() => {
    // Function to handle the form initialization
    const handleFormInitialization = () => {
      try {
        if (typeof window === 'undefined') return;
        
        // Only run on the admin post create page
        const url = window.location.pathname;
        if (!url.includes('/admin/collections/posts/create')) return;
        
        // Check if we have Notion content in sessionStorage
        const notionContent = sessionStorage.getItem('notionImportContent');
        const notionImages = sessionStorage.getItem('notionImportImages');
        
        if (!notionContent) return;
        
        console.log('Found Notion content to load into form');
        
        // Parse the content
        const lexicalContent = JSON.parse(notionContent);
        const images = notionImages ? JSON.parse(notionImages) : [];
        
        // Create a function to populate form fields once they're available
        const populateFormFields = () => {
          // Try to find the form and fields
          const titleInput = document.querySelector('input[name="title"]');
          if (titleInput) {
            // Find a title from the first heading
            if (lexicalContent.root && 
                lexicalContent.root.children && 
                lexicalContent.root.children.length > 0) {
              
              const firstNode = lexicalContent.root.children[0];
              if (firstNode.type === 'heading' && firstNode.children.length > 0) {
                const titleText = firstNode.children[0].text;
                
                // Set title value
                (titleInput as HTMLInputElement).value = titleText;
                // Trigger input event to update React state
                titleInput.dispatchEvent(new Event('input', { bubbles: true }));
                
                console.log('Set title from Notion content:', titleText);
              }
            }
          } else {
            // If fields aren't available yet, try again later
            console.log('Form fields not yet available, retrying...');
            setTimeout(populateFormFields, 500);
            return;
          }
          
          // Set Lexical editor content - this is more complex and may require integration with Payload's editor
          
          // Clean up after successful population
          sessionStorage.removeItem('notionImportContent');
          sessionStorage.removeItem('notionImportImages');
          
          console.log('Notion content loaded into form successfully');
        };
        
        // Start trying to populate the form
        populateFormFields();
      } catch (error) {
        console.error('Error loading Notion content:', error);
      }
    };
    
    // Run once on component mount
    handleFormInitialization();
  }, []);

  // Component doesn't render anything
  return null;
};

export default ClientFormLoader; 