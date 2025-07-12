import { useState, forwardRef, useImperativeHandle } from "react";
import axios from '../utils/axios';

const NutritionAnalyzer = forwardRef(({ calorieData }, ref) => {
  const [form, setForm] = useState({
    gender: "male",
    age: 21,
    weight: 70,
    height: 170,
    activityLevel: 1.55,
    goalType: "maintaining",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "activityLevel"
          ? parseFloat(e.target.value)
          : e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!calorieData || calorieData.length === 0) return;
    setLoading(true);
    try {
      const res = await axios.post("/analyze", {
        ...form,
        data: calorieData,
      });
      setResult(res.data);
    } catch (err) {
      console.error("Analysis error:", err.response?.data || err.message);
    }
    setLoading(false);
  };

  // 👇 expose triggerAnalyze to parent via ref
  useImperativeHandle(ref, () => ({
    triggerAnalyze: handleSubmit,
  }));

  return (
    <div className="bg-white p-6 rounded-xl space-y-6 w-full">
      <h2 className="text-xl font-bold text-purple-700">Nutrition Analysis</h2>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <label>Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label>Age</label>
          <input
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label>Height (cm)</label>
          <input
            name="height"
            type="number"
            value={form.height}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label>Weight (kg)</label>
          <input
            name="weight"
            type="number"
            value={form.weight}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div className="col-span-2">
          <label>Activity Level</label>
          <select
            name="activityLevel"
            value={form.activityLevel}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value={1.2}>Sedentary</option>
            <option value={1.375}>Light</option>
            <option value={1.55}>Moderate</option>
            <option value={1.725}>Very Active</option>
            <option value={1.9}>Super Active</option>
          </select>
        </div>

        <div className="col-span-2">
          <label>Goal</label>
          <select
            name="goalType"
            value={form.goalType}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="maintaining">Maintain</option>
            <option value="bulking">Bulk</option>
            <option value="cutting">Cut</option>
          </select>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50 text-sm whitespace-pre-wrap">
          <h3 className="font-semibold text-purple-700 mb-2">
            Gemini Analysis:
          </h3>
          {result.analysis}
          <p className="mt-2 text-gray-500 italic">
            Goal: {result.goalCalories} kcal/day
          </p>
        </div>
      )}
    </div>
  );
});

export default NutritionAnalyzer;
