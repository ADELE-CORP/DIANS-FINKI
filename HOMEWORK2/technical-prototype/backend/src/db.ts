import mongoose from 'mongoose';
import fs from 'fs';

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

export default FeatureModel;

export async function dbConnect() {
    await mongoose
        .connect("mongodb://172.21.16.1:27017/adeleDB", {
            family: 4,
        })
        .then((db) => {
            console.log("DB connection successful!\n\n");
        })
        .catch((err) => {
            console.error("DB connection error ", err);
        });
}

export async function saveData() {
    const geoJSONPath = './reduced5.geojson';

    fs.readFile(geoJSONPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the GeoJSON file:', err);
            return;
        }

        const geoJSONData = JSON.parse(data);

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