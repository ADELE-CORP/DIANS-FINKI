import express from 'express';
import FeatureModel, { dbConnect, saveData } from './db';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

(async () => {
    await dbConnect();
    //await saveData();
})();

app.get('/data', async (req, res) => {
    try {
        const data = await FeatureModel.find();
        res.status(200).send(JSON.stringify(data));
    } catch (error) {
        res.status(500).send('Error fetching data from MongoDB');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
