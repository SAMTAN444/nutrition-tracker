import dotenv from 'dotenv';
dotenv.config();

console.log("Loaded Nutritionix App ID:", process.env.NUTRITIONIX_APP_ID);
console.log("Loaded Nutritionix API Key:", process.env.NUTRITIONIX_API_KEY);


import express from 'express';
import cors from 'cors';
import nutritionRoute from './routes/nutrition.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/nutrition', nutritionRoute);

const PORT = 5175;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`))

app.use((req, res, next) => {
  console.log('Received request:', req.method, req.path);
  next();
});