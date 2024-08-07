import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import ImageModel from "../models/imageModel.js"
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid'
dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.route('/').get(async (req, res) => {
    try {
        const images = await ImageModel.find();
        res.status(200).json(images);
    } catch (error) {
        next(error);
    }
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: "1024x1024",
        });

        const uniqueId = uuidv4();

        const uploadResult = await cloudinary.uploader
            .upload(
                response.data[0].url, {
                public_id: uniqueId,
            }
            )
            .catch((error) => {
                console.log(error);
            });

        const newImage = new ImageModel({
            prompt,
            imgLink: uploadResult.url
        });

        const createdImage = await newImage.save();

        res.status(200).json(createdImage);

    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'An error occurred while generating the image' });
    }
});

export default router;
