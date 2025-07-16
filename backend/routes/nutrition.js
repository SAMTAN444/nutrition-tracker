import express from 'express';
import axios from 'axios';
import Food from "../models/FoodEntry.js";
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
    const { food } = req.body;
    console.log('POST /api/nutrition hit with food:', food);

    try {
        const response = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients',
            { query: food },
            {
                headers: {
                    'x-app-id': process.env.NUTRITIONIX_APP_ID, // your App ID
                    'x-app-key': process.env.NUTRITIONIX_API_KEY, // your App Key
                    'Content-Type': 'application/json'
                }
            }
        );
        const foods = response.data.foods;

        if (!foods || foods.length === 0) {
            return res.status(404).json({ message: "Food not found in Nutrionix." });
        }

        const savedFoods = await Promise.all(foods.map(async (item) => {
            const newFood = new Food({
                name: item.food_name,
                protein: item.nf_protein,
                fat: item.nf_total_fat,
                sodium: item.nf_sodium,
                calories: item.nf_calories,
                image: item.photo?.thumb || null,
                grams: 150,
                user: req.user.id,
            });

            await newFood.save();
            return newFood;
        }))


        // Then respond to client
        res.json(savedFoods);

    } catch (err) {
        console.error('Nutritionix API error:', err.response?.data || err.message);
        res.status(500).json({
            error: 'Something went wrong.',
            details: err.response?.data || err.message
        });
    }
});

router.post('/search', authenticateToken, async (req, res) => {
    const { food } = req.body;

    try {
        const response = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients',
            { query: food },
            {
                headers: {
                    'x-app-id': process.env.NUTRITIONIX_APP_ID,
                    'x-app-key': process.env.NUTRITIONIX_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        )
        const results = response.data.foods.map(item => ({
            name: item.food_name,
            protein: item.nf_protein,
            fat: item.nf_total_fat,
            sodium: item.nf_sodium,
            calories: item.nf_calories,
            carbs: item.nf_total_carbohydrate,
            image: item.photo?.thumb || null,
            grams: 150,
            user: req.user.id,
        }));

        res.json(results);
    } catch (err) {
        console.error('Nutrionix search failed:', err.response?.data || err.message);
        res.status(500).json({
            error: 'Search failed',
            details: err.response?.data || err.message,
        })
    }
})

router.post('/custom', authenticateToken, async (req, res) => {
    try {
        const { name, protein, fat, sodium, calories, image, grams } = req.body;

        const newFood = new Food({
            name,
            protein,
            fat,
            sodium,
            calories,
            image,
            grams: grams || 150,
            user: req.user.id,
        });

        await newFood.save();
        res.status(201).json(newFood);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save custom food entry.' });
    }
})



router.get('/', authenticateToken, async (req, res) => {
    const { date } = req.query;

    try {
        let filter = { user: req.user.id };

        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            filter.createdAt = { $gte: startOfDay, $lte: endOfDay };
        }

        const foods = await Food.find(filter).sort({ createdAt: -1 });
        res.json(foods);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch food entries.' });
    }
});

router.get('/daily-calories', authenticateToken, async (req, res) => {
    const days = parseInt(req.query.days) || 14;

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    try {
        const foods = await Food.find({ 
            user: req.user.id,
            createdAt: { $gte: cutoff }});

        const caloriesByDate = {};

        foods.forEach((item) => {
            const date = new Date(item.createdAt).toISOString().split('T')[0]
            if (!caloriesByDate[date]) caloriesByDate[date] = 0;
            caloriesByDate[date] += item.calories;
        });
        const result = Object.entries(caloriesByDate)
        .map(([date, calories]) => ({ date, calories }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

        res.json(result);
    } catch(err) {
        console.error('Failed to fetch daily calories', err);
        res.status(500).json({ error: 'Failed to fetch daily calories'});
    }

})


router.patch(`/:id`, authenticateToken, async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food || food.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const updated = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update food entry' });
    }
})

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food || food.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        await Food.findByIdAndDelete(req.params.id);
        res.json({ message: 'Food deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete food item.' });
    }
})

export default router;
