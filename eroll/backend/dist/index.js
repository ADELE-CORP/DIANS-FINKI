"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const db_1 = require("./db");
// Ensure this is correctly exported from userModel.ts
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// Database connection
(0, db_1.dbConnect)().then(() => {
    console.log("DB connection successful!");
    // Optional: Call saveData here if needed
    //  saveData();
});
// Use auth routes
app.use('/auth', authRoutes_1.default);
// Existing data route
app.get('/data', async (req, res) => {
    try {
        const data = await db_1.FeatureModel.find();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).send('Error fetching data from MongoDB');
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map