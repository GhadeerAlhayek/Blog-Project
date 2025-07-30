import express from 'express';
import { uploadImage, deleteImage } from '../controller/upload.controller.js';
import upload from '../middelwares/upload.middleware.js';
import { authenticate } from '../middelwares/auth.middleware.js';

const router = express.Router();

// Protect upload routes with authentication
router.use(authenticate);

// Upload single image
router.post('/image', upload.single('image'), uploadImage);

// Delete image
router.delete('/image/:filename', deleteImage);

export default router;