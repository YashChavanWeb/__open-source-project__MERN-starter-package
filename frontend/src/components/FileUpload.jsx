import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setMessage('');
    };

    const handleUpload = async () => {
        if (!file) return setMessage('Please select a file to upload.');

        const formData = new FormData();
        formData.append('file', file);
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/v1/upload/file', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('File upload failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload a File</h2>

            <div className="flex flex-col items-center justify-center space-y-4">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />

                <button
                    onClick={handleUpload}
                    disabled={isLoading}
                    className={`w-full px-4 py-2 text-white rounded-md transition ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {isLoading ? 'Uploading...' : 'Upload'}
                </button>

                {message && (
                    <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
