import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface DocumentUploadProps {
  onUpload: (files: File[]) => void;
}

export const DocumentUpload = ({ onUpload }: DocumentUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Upload Documents</h2>
        <p className="mt-2 text-gray-600">
          Upload your financial documents or bank statements
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-gray-600">
            {isDragActive ? 'Drop files here' : 'Drag and drop files here, or click to browse'}
          </p>
          <p className="text-sm text-gray-500">PDF, PNG, JPG up to 10MB</p>
        </div>
      </div>

      {files.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Uploaded Files</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-gray-700">{file.name}</span>
                <button
                  onClick={() => {
                    const newFiles = files.filter((_, i) => i !== index);
                    setFiles(newFiles);
                    onUpload(newFiles);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}; 