// routes/favoriteRoutes.ts

import express from 'express';
import Favorite from '../model/favoriteModel';
import { Request, Response } from 'express';

const router = express.Router();

// Add a favorite
router.post('/add', async (req: Request, res: Response) => {
    const { userId, placeId } = req.body;
    try {
        const favorite = await Favorite.create({ userId, placeId });
        res.status(201).json(favorite);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add favorite' });
    }
});

// Remove a favorite
router.delete('/remove', async (req: Request, res: Response) => {
    const { userId, placeId } = req.body;
    try {
        await Favorite.findOneAndDelete({ userId, placeId });
        res.status(200).json({ message: 'Favorite removed' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to remove favorite' });
    }
});

// Get user's favorites
router.get('/user/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const favorites = await Favorite.find({ userId }).populate('placeId');
        res.status(200).json(favorites);
    } catch (error) {
        res.status(400).json({ error: 'Failed to get favorites' });
    }
});

export default router;
