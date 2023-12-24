// models/favoriteModel.ts

import mongoose, { Schema, Document } from 'mongoose';

interface IFavorite extends Document {
    userId: mongoose.Types.ObjectId;
    placeId: mongoose.Types.ObjectId;
}

const favoriteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    placeId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Feature'
    }
});

const Favorite = mongoose.model<IFavorite>('Favorite', favoriteSchema);
export default Favorite;
