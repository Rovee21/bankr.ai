import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFileToIndex } from '../services/api';

interface DocumentUploadProps {
  onUpload: (files: File[]) => void;
}

export const DocumentUpload = ({ onUpload }: DocumentUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<{success: boolean, message: string} | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    setFiles(prev => [...prev, ...acceptedFiles]);
    onUpload(acceptedFiles);
    
    // Clear previous status
    setUploadStatus(null);
  }, [onUpload]);

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onUpload(newFiles);
  };

  const handleProcessFiles = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    setUploadStatus(null);
    
    try {
      // Process each file in sequence
      for (const file of files) {
        await uploadFileToIndex(file);
      }
      
      setUploadStatus({
        success: true,
        message: `Successfully processed ${files.length} file(s)`
      });
    } catch (error) {
      console.error('Error processing files:', error);
      setUploadStatus({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to process files'
      });
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-accent mb-3">Upload Documents</h2>
        <p className="text-gray-300">
          Upload your financial documents or bank statements for AI analysis
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300
          ${isDragActive ? 'border-accent bg-accent/10' : 'border-gray-600 hover:border-accent/70 hover:bg-primary-dark'}`}
      >
        <input {...getInputProps()} />
        <div className="space-y-3">
          {/* Animated upload icon */}
          <div className="mx-auto w-16 h-16 relative">
            <div className={`absolute inset-0 rounded-full ${isDragActive ? 'bg-accent/20 animate-ping' : 'bg-accent/10'}`}></div>
            <svg
              className="relative mx-auto h-16 w-16 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <p className="text-accent font-medium">
            {isDragActive ? 'Drop your files here' : 'Drag and drop files here, or click to browse'}
          </p>
          <p className="text-sm text-gray-400">PDF, PNG, JPG up to 10MB</p>
        </div>
      </div>

      {uploadStatus && (
        <div className={`p-4 rounded-lg ${uploadStatus.success ? 'bg-green-900/20 border border-green-700/50' : 'bg-red-900/20 border border-red-700/50'}`}>
          <div className="flex items-center">
            {uploadStatus.success ? (
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <p className={uploadStatus.success ? 'text-green-400' : 'text-red-400'}>
              {uploadStatus.message}
            </p>
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-accent mb-4">Uploaded Files</h3>
          <ul className="space-y-3">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 bg-primary-dark rounded-lg border border-primary-light"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-accent/20 rounded-md flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-200 font-medium truncate w-52 sm:w-80">{file.name}</p>
                    <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-accent bg-primary rounded-md p-2 transition-colors"
                  disabled={uploading}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <button 
              onClick={handleProcessFiles}
              disabled={uploading || files.length === 0}
              className={`w-full px-5 py-2.5 bg-accent hover:bg-accent-light text-primary font-medium rounded-lg transition-colors duration-300 flex items-center justify-center
                ${uploading || files.length === 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {uploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  Process Documents
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 