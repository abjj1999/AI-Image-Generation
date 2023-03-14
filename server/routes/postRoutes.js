import express from 'express'; // import express from 'express';
import  * as dotenv from 'dotenv'; // import  * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary'; // import { v2 as cloudinary } from 'cloudinary';
import Post from '../models/Post.js';

dotenv.config(); // dotenv.config();

const router = express.Router(); // const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

router.route('/').get(async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({
            success: true,
            data: posts
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error?.response.data.error.message
        });
        console.log(error?.response.data.error.message)
    }
})

router.route('/').post(async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;

        const result = await cloudinary.uploader.upload(photo, {
            folder: 'Ai-G'
        })

        const newPost = await  Post.create({
            name,
            prompt,
            photo: result.secure_url,
            
        })

        res.status(200).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
        console.log(error)
        
    }
})

export default router; // export default router;