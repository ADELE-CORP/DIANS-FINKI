//DEFAULT GATEWAYY API

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import {FeatureModel, dbConnect, saveData} from './db';
// Ensure this is correctly exported from userModel.ts

import favoriteRoutes from './routes/favoriteRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
   origin: ['http://localhost:3000', 'http://localhost:5173','https://adele-corp.onrender.com'],
  //  origin : 'http://localhost:3000',
   //  origin: ['https://adele-corp.onrender.com'],
    credentials: true,
}));


app.use(cookieParser());
app.use(express.json());
app.use('/favorites', favoriteRoutes);

// Database connection
dbConnect().then(() => {
    console.log("DB connection successful!");

    // Optional: Call saveData here if needed
    // saveData();
});

// Use auth routes
app.use('/auth', authRoutes);

// Existing data route
app.get('/data', async (req, res) => {
    try {
        const data = await FeatureModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('Error fetching data from MongoDB');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
