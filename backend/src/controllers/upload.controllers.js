import cloudinary from '../config/cloudinary.config.js';
import File from '../models/files.models.js';
import fs from 'fs'

const uploadFile = async (req, res) => {
    try {
        const filePath = req.file.path;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'your_folder_name', // Optional
        });

        // Remove file from local uploads folder
        fs.unlink(filePath, (err) => {
            if (err) console.error('Error removing local file:', err);
            else console.log('Local file removed:', filePath);
        });

        res.status(200).json({
            message: 'File uploaded successfully to Cloudinary.',
            url: result.secure_url,
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Failed to upload file.' });
    }
};

export { uploadFile };
