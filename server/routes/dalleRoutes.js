import express from 'express'; // import express from 'express';
import  * as dotenv from 'dotenv'; // import  * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
dotenv.config(); // dotenv.config();
const router = express.Router(); // const router = express.Router();


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

router.route('/').get(async (req, res) => {
    res.send('Hello From openAi'); // res.send('Hello From Express');
})

export default router; // export default router;

