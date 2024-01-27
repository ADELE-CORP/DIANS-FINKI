"use strict";
// routes/favoriteRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const favoriteModel_1 = __importDefault(require("../model/favoriteModel"));
const router = express_1.default.Router();
// Add a favorite
router.post('/add', async (req, res) => {
    const { userId, placeId } = req.body;
    try {
        const favorite = await favoriteModel_1.default.create({ userId, placeId });
        res.status(201).json(favorite);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to add favorite' });
    }
});
// Remove a favorite
router.delete('/remove', async (req, res) => {
    const { userId, placeId } = req.body;
    try {
        await favoriteModel_1.default.findOneAndDelete({ userId, placeId });
        res.status(200).json({ message: 'Favorite removed' });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to remove favorite' });
    }
});
// Get user's favorites
router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const favorites = await favoriteModel_1.default.find({ userId }).populate('placeId');
        res.status(200).json(favorites);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to get favorites' });
    }
});
exports.default = router;
//# sourceMappingURL=favoriteRoutes.js.map