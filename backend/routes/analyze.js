import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function calculateTDEE({ gender, weight, height, age, activityLevel }) {
    const bmr = gender === "male" 
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;
    return bmr * activityLevel
}

router.post("/", async (req, res) => {
    try {
        const {
            gender,
            age,
            weight,
            height,
            activityLevel,
            goalType,
            data,
        } = req.body

        const tdee = calculateTDEE({ gender, weight, height, age, activityLevel });

        let goalCalories = tdee;
        if (goalType === "bulking") goalCalories += 300;
        else if (goalType === "cutting") goalCalories -= 300;

        const formatted = data
            .map((d) => `${new Date(d.date).toDateString()}: ${d.calories} kcal`)
            .join("\n");

            const prompt = `
            You are a helpful nutrition coach.
            The user is a ${age}-year-old ${gender}.
            Their estimated maintenance level is ${Math.round(tdee)} kcal.
            They are currently ${goalType} and aiming for about ${Math.round(goalCalories)} kcal.day.

            Here is their calorie intake for the past ${data.length} days:
            ${formatted}

            Please analyze:
            - How consistent their intake is with their goal
            - Whether they are regularly over or under
            - Any fluctuations or patterns
            - 1-2 friendly suggestions or encouragements

            Be brief, clear and supportive
            `;

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            res.json({ anaylsis: text, goalCalories: Math.round(goalCalories) })
    } catch (err) {
        console.error("Gemini analysis failed:", err);

        res.status(500).json({ error: "failed to generate Gemini analysis" });
    }
});

export default router;