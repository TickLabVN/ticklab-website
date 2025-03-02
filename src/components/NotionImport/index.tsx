'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FileText, Image, File, Loader2, X, Upload } from 'lucide-react';

interface NotionImportProps {
  redirectUrl?: string;
  collection: string;
}

const NotionImport: React.FC<NotionImportProps> = ({ 
  redirectUrl = '/admin/collections/posts', 
  collection = 'posts' 
}) => {
  // Component state
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [markdownFile, setMarkdownFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // References for file inputs
  const markdownInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Only run client-side code after hydration is complete
  useEffect(() => {
    setIsMounted(true);
    
    // Hide any duplicate h1 elements that contain "Import from Notion"
    const headers = document.querySelectorAll('h1, h2, h3');
    headers.forEach(header => {
      if (header.textContent?.includes('Import from Notion') && 
          !header.closest('#notion-import-modal')) {
        (header as HTMLElement).style.display = 'none';
      }
    });
  }, []);

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        setMarkdownFile(file);
        // Ask for images after selecting markdown
        handleSelectImages();
      }
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFiles(e.target.files);
    }
  };

  const handleImport = async () => {
    if (!markdownFile) {
      toast.error('Please select a Markdown file to import', {
        description: 'Error importing from Notion'
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create form data to send files
      const formData = new FormData();
      formData.append('markdown', markdownFile);
      
      // Add all image files if any
      if (imageFiles) {
        Array.from(imageFiles).forEach((file) => {
          formData.append('images', file);
        });
      }

      // Send the request to our API endpoint
      const response = await fetch('/api/notion-import', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to import from Notion' }));
        throw new Error(errorData.error || 'Failed to import from Notion');
      }

      const result = await response.json();

      toast.success('Successfully imported content from Notion', {
        description: 'Redirecting to create a new post...'
      });

      // Redirect to create a new post with the imported content
      if (result.lexicalContent) {
        // We'll use session storage instead of localStorage for better security
        sessionStorage.setItem('notionImportContent', JSON.stringify(result.lexicalContent));
        sessionStorage.setItem('notionImportImages', JSON.stringify(result.uploadedImages || []));
        
        // Redirect to the create page
        router.push(`/admin/collections/${collection}/create`);
      }
    } catch (error) {
      console.error('Error importing from Notion:', error);
      toast.error('Failed to import content from Notion', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
      setMarkdownFile(null);
      setImageFiles(null);
      setShowModal(false);
    }
  };

  const handleSelectMarkdown = () => {
    if (markdownInputRef.current) {
      markdownInputRef.current.click();
    }
  };

  const handleSelectImages = () => {
    if (imagesInputRef.current) {
      imagesInputRef.current.click();
    }
  };

  const closeModal = () => {
    setMarkdownFile(null);
    setImageFiles(null);
    setShowModal(false);
  };

  return (
    <div className="notion-import-container" style={{ margin: '20px 0' }}>
      {/* Just the button - kept simple */}
      <Button 
        onClick={() => setShowModal(true)}
        variant="outline"
        size="sm"
        className="bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700"
        disabled={isLoading}
      >
        <File className="w-4 h-4 mr-2" />
        {isLoading ? 'Importing...' : 'Import from Notion'}
        {isLoading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
      </Button>

      {/* Portal the modal to the document body to avoid nesting issues - only show after client-side mounting */}
      {showModal && isMounted && (
        <div id="notion-import-modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Backdrop */}
          <div onClick={closeModal} style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }} />
          
          {/* Modal content */}
          <div style={{
            position: 'relative',
            backgroundColor: '#222',
            borderRadius: '8px',
            padding: '24px',
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            margin: '0 16px',
            border: '1px solid #444',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}>
              <h3 style={{
                color: 'white',
                fontSize: '18px',
                fontWeight: 500,
                margin: 0,
              }}>Import from Notion</h3>
              
              <button onClick={closeModal} style={{
                background: 'transparent',
                border: 'none',
                color: '#999',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <X size={16} />
              </button>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '20px',
            }}>
              {/* Instructions panel */}
              <div style={{
                backgroundColor: '#333',
                borderRadius: '6px',
                padding: '16px',
                fontSize: '14px',
                color: '#ccc',
              }}>
                <p style={{
                  fontWeight: 500,
                  marginBottom: '12px',
                  color: '#eee',
                }}>How to export from Notion:</p>
                
                <ol style={{
                  marginLeft: '20px',
                  paddingLeft: 0,
                  lineHeight: 1.6,
                }}>
                  <li>Open your Notion page</li>
                  <li>Click "..." in the top right corner</li>
                  <li>Select "Export" and choose "Markdown & CSV"</li>
                  <li>Select "Include subpages" if needed</li>
                  <li>Click "Export" and save the .zip file</li>
                  <li>Extract the .zip file to get the .md and images</li>
                </ol>
              </div>
              
              {/* File selection panel */}
              <div style={{
                backgroundColor: '#333',
                borderRadius: '6px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div style={{ marginBottom: '16px' }}>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#eee',
                    marginBottom: '8px',
                  }}>Import files</p>
                  
                  {markdownFile ? (
                    <div style={{
                      backgroundColor: '#222',
                      borderRadius: '6px',
                      padding: '12px',
                      marginBottom: '12px',
                      border: '1px solid #444',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FileText size={16} style={{ color: '#999', marginRight: '8px' }} />
                        <div>
                          <p style={{ fontSize: '14px', color: '#eee', margin: '0 0 4px 0' }}>
                            {markdownFile.name}
                          </p>
                          <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>
                            {(markdownFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p style={{ fontSize: '14px', color: '#999', marginBottom: '12px' }}>
                      No markdown file selected
                    </p>
                  )}
                  
                  {imageFiles && imageFiles.length > 0 && (
                    <div style={{
                      backgroundColor: '#222',
                      borderRadius: '6px',
                      padding: '12px',
                      border: '1px solid #444',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Image size={16} style={{ color: '#999', marginRight: '8px' }} />
                        <div>
                          <p style={{ fontSize: '14px', color: '#eee', margin: '0 0 4px 0' }}>
                            {imageFiles.length} image{imageFiles.length !== 1 ? 's' : ''}
                          </p>
                          <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>
                            Ready to import
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button 
                    onClick={handleSelectMarkdown}
                    disabled={isLoading}
                    style={{
                      backgroundColor: '#333',
                      color: 'white',
                      border: '1px solid #444',
                      borderRadius: '4px',
                      padding: '8px 12px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      opacity: isLoading ? 0.6 : 1,
                    }}
                  >
                    <FileText size={16} style={{ marginRight: '8px' }} />
                    {markdownFile ? "Change file" : "Select .md file"}
                  </button>
                  
                  {markdownFile && (
                    <button
                      onClick={handleSelectImages}
                      disabled={isLoading}
                      style={{
                        backgroundColor: '#333',
                        color: 'white',
                        border: '1px solid #444',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        opacity: isLoading ? 0.6 : 1,
                      }}
                    >
                      <Image size={16} style={{ marginRight: '8px' }} />
                      {imageFiles && imageFiles.length > 0 ? "Change images" : "Add images"}
                    </button>
                  )}
                  
                  {/* Add Import button when both files are selected */}
                  {markdownFile && imageFiles && imageFiles.length > 0 && (
                    <button
                      onClick={handleImport}
                      disabled={isLoading}
                      style={{
                        backgroundColor: '#10b981', // Green color
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        opacity: isLoading ? 0.6 : 1,
                        marginLeft: 'auto',
                      }}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={16} style={{ marginRight: '8px' }} className="animate-spin" />
                          Importing...
                        </>
                      ) : (
                        <>
                          <Upload size={16} style={{ marginRight: '8px' }} />
                          Import Content
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Hidden file inputs */}
            <input
              ref={markdownInputRef}
              type="file"
              accept=".md"
              onChange={handleMarkdownChange}
              style={{ display: 'none' }}
            />
            
            <input
              ref={imagesInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotionImport;