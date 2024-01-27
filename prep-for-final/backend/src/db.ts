import mongoose from 'mongoose';
import fs from 'fs';


import User from './model/userModel';

const Schema = mongoose.Schema;

const Feature = new Schema({
    type: {
        type: String,
        enum: ['Feature'],
        required: true
    },
    properties: {
        type: Map,
        of: Schema.Types.Mixed
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

const FeatureModel = mongoose.model('Feature', Feature);



export async function dbConnect() {
    const uri: string = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/quksh';
    try {
        await mongoose.connect(uri);
        console.log(uri)
        console.log("DB connection successful!");
    } catch (err) {
        console.error("DB connection error: ", err);
    }
}

export async function saveData() {
    const geoJSONPath = './reduced5.geojson';

    fs.readFile(geoJSONPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the GeoJSON file:', err);
            return;
        }

        const geoJSONData = JSON.parse(data);

        console.log(geoJSONData)

        geoJSONData.forEach(async (ftr: any) => {
            const featDoc = new FeatureModel(ftr);

            await featDoc.save()
                .then(() => {
                    console.log('GeoJSON data saved to MongoDB');
                })
                .catch(err => {
                    console.error('Error saving GeoJSON data to MongoDB:', err);
                });
        });
    });
}


export { User };
export { FeatureModel };