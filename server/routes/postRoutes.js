import express from 'express'; // import express from 'express';
import  * as dotenv from 'dotenv'; // import  * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary'; // import { v2 as cloudinary } from 'cloudinary';
import Post from '../models/Post.js';

dotenv.config(); // dotenv.config();

const router = express.Router(); // const router = express.Router();

export default router; // export default router;