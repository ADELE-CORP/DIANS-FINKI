"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureModel = exports.User = exports.saveData = exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const userModel_1 = __importDefault(require("./model/userModel"));
exports.User = userModel_1.default;
const Schema = mongoose_1.default.Schema;
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
const FeatureModel = mongoose_1.default.model('Feature', Feature);
exports.FeatureModel = FeatureModel;
async function dbConnect() {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/adeleDB';
    try {
        await mongoose_1.default.connect(uri);
        console.log("DB connection successful!");
    }
    catch (err) {
        console.error("DB connection error: ", err);
    }
}
exports.dbConnect = dbConnect;
async function saveData() {
    const geoJSONPath = './reduced5.geojson';
    fs_1.default.readFile(geoJSONPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the GeoJSON file:', err);
            return;
        }
        const geoJSONData = JSON.parse(data);
        console.log(geoJSONData);
        geoJSONData.forEach(async (ftr) => {
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
exports.saveData = saveData;
//# sourceMappingURL=db.js.map