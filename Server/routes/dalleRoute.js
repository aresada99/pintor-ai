import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import ImageModel from "../models/imageModel.js"
dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.route('/').get((req, res) => {
    res.send('Test route of Dall-E Image Generation');
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

        const newImage = new ImageModel({
            prompt,
            imgLink : response.data[0].url
        });

        const createdImage = await newImage.save();

        res.status(200).json(createdImage);

    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'An error occurred while generating the image' });
    }
});

export default router;
