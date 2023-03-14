import express from 'express'; // import express from 'express';
import  * as dotenv from 'dotenv'; // import  * as dotenv from 'dotenv';
import cors from 'cors'; // import cors from 'cors';
import connectDB from './config/connect.js'; // import connectDB from './config/connect';
dotenv.config(); // dotenv.config();
import postRoutes from './routes/postRoutes.js'; // import postRoutes from './routes/postRoutes';
import dalleRoutes from './routes/dalleRoutes.js'; // import dalleRoutes from './routes/dalleRoutes';

const app = express(); // const app = express();
app.use(cors()); // app.use(cors());
app.use(express.json({
    limit: '50mb',
})); // app.use(express.json());
app.use('/api/v1/posts', postRoutes); // app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/dalle', dalleRoutes); // app.use('/api/v1/dalles', dalleRoutes);
app.get('/', (req, res) => {
    res.send('Hello From Express'); // res.send('Hello From Express');
})

const startServer = async () => { 
    try {
        connectDB(process.env.MONGO_URL); // connectDB(process.env.MONGO_URL);
        app.listen(8080, () => {
            console.log('Server is running on port 8080'); // console.log('Server is running on port 8080');
        })
    } catch (error) {
        console.log(error)
    }

}// const startServer = async () => {


startServer();