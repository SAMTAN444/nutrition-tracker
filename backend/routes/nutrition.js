import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
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

        const simplified = foods.map((item) => ({
            name: item.food_name,
            serving: `${item.serving_qty} ${item.serving_unit}`,
            weight_grams: item.serving_weight_grams,
            calories: item.nf_calories,
            protein_g: item.nf_protein,
            fat_g: item.nf_total_fat,
            carbs_g: item.nf_total_carbohydrate
        }))

        res.json(simplified);
    } catch (err) {
        console.error('Nutritionix API error:', err.response?.data || err.message);
        res.status(500).json({
            error: 'Something went wrong.',
            details: err.response?.data || err.message
        });
    }
});

export default router;
