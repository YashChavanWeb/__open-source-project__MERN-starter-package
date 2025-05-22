import express from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/upload.controllers.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

router.post('/file', upload.single('file'), uploadFile);

export default router;
