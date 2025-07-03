import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import nutritionRoute from './routes/nutrition.js';

dotenv.config();
const app = express();

// MiddleWare
app.use(cors());
app.use(express.json());
app.use('/api/nutrition', nutritionRoute);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error", err));

// Fallback logger
app.use((req, res, next) => {
  console.log('Received request:', req.method, req.path);
  next();
})

const PORT = 5175;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`))
