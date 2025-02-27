
import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';
import LostItem from '../models/LostItem.js';
import VerificationRequest from '../models/VerificationRequest.js';

const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Submit Verification Request
router.post('/verify', upload.single('proofImage'), async (req, res) => {
    try {
        const { itemId, finderName, finderEmail, message, answer } = req.body;
        const proofImage = req.file ? req.file.path : '';
        const lostItem = await LostItem.findById(itemId);

        if (!lostItem) {
            return res.status(404).json({ message: 'Lost item not found' });
        }

        // Save verification request
        const verification = new VerificationRequest({
            itemId,
            finderName,
            finderEmail,
            message,
            answer,
            proofImage
        });
        await verification.save();

        // Send email to lost item's owner
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: lostItem.ownerEmail,
            subject: 'Lost Item Verification Request',
            text: `Hello,\n\n${finderName} has found an item matching your lost item listing.\n\nMessage: ${message}\nProof Image: ${proofImage}\nAnswer to your question: ${answer}\nContact: ${finderEmail}\n\nPlease verify the request.`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Verification request submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
