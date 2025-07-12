import { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { UtensilsCrossed } from "lucide-react";
import axios from '../utils/axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const FoodPreviewCard = ({ onAdd }) => {
  const [food, setFood] = useState(null);
  const [grams, setGrams] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");

  const getAdjusted = (val) => ((val * grams) / 150).toFixed(1);

  const data = food
    ? [
        { name: "Carbs", value: food.carbs, color: "#ef4444" },
        { name: "Protein", value: food.protein, color: "#facc15" },
        { name: "Fat", value: food.fat, color: "#3b82f6" },
      ]
    : [];

  const totalMacros = food ? food.carbs + food.protein + food.fat : 0;
  const adjustedCalories = food ? ((food.calories * grams) / 150).toFixed(1): 0;
  const adjustedSodium = food ? getAdjusted(food.sodium) : 0;

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setFood(null);
    try {
      const res = await axios.post("/nutrition/search", { food: searchTerm });

      if (res.data.length > 0) {
        const item = res.data[0];

        setFood({
          name: item.name,
          protein: item.protein,
          fat: item.fat,
          sodium: item.sodium,
          calories: item.calories,
          carbs: item.carbs || 0,
          image: item.image || "https://via.placeholder.com/300",
        });

        setGrams(150); // Reset grams
      } else {
        MySwal.fire({
        icon: "error",
        title: "No result found",
        text: err.response?.data?.message || "Please Try again"
      })
      }
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Search Error",
        text: err.response?.data?.message || "Please try again"
      })
    }
  };

  const handleAdd = async () => {
    try {
      const payload = {
        name: food.name,
        protein: Number(getAdjusted(food.protein)),
        fat: Number(getAdjusted(food.fat)),
        sodium: Number(getAdjusted(food.sodium)),
        calories: Number(adjustedCalories),
        image: food.image || null,
        grams,
      };

      await axios.post("/nutrition/custom", payload);
      if (onAdd) onAdd(); //  callback to refresh FoodSummary
      setGrams(100);
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to add food",
        text: err.response?.data?.message || "Please Try again"
      })
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-2 mt-4 mb-4">
        <UtensilsCrossed className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
          Food Macros
        </h2>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for food..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2  focus:ring-purple-400"
        />
        <button
          onClick={handleSearch}
          className="bg-purple-200 hover:bg-purple-300 text-black px-4 py-2 rounded-lg text-sm"
        >
          Search
        </button>
      </div>
      {food && (
        <>
          {/* Food Image */}
          <div className="w-full h-40 overflow-hidden rounded-xl mb-4">
            <img
              src={food.image || "https://via.placeholder.com/300"}
              alt={food.name}
              className="w-full h-full object-cover border-3 rounded-xl border-black"
            />
          </div>

          {/* Food Name */}
          <h2 className="text-xl font-bold text-center text-black mb-4">
            {food.name}
          </h2>

          {/* Nutrition Chart + Breakdown */}
          <div className="flex justify-center items-center gap-6 flex-wrap mb-3">
            <div className="relative">
              <PieChart width={120} height={120}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-700">%</span>
              </div>
            </div>

            <div className="w-full text-sm space-y-1">
              {data.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center w-full justify-between"
                >
                  {/* Left: Dot + Label */}
                  <div className="flex items-center gap-2 w-1/2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-700 font-medium">
                      {item.name}
                    </span>
                  </div>

                  {/* Right: Value + Percentage aligned */}
                  <div className="w-1/2 text-right">
                    <span className="text-gray-900 font-semibold">
                      {getAdjusted(item.value)}g
                    </span>
                    <span className="text-gray-500">
                      {" "}
                      ({((item.value / totalMacros) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Extra Info */}
          <div className="flex bg-purple-50 rounded-xl px-4 py-2 mb-4">
            {/* Calories */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <p className="text-sm font-semibold text-gray-700">Calories</p>
              <p className="text-lg font-bold text-black">
                {adjustedCalories} kcal
              </p>
            </div>

            {/* Divider */}
            <div className="w-px bg-gray-300 mx-2" />

            {/* Sodium */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <p className="text-sm font-semibold text-gray-700">Sodium</p>
              <p className="text-lg font-bold text-black">{adjustedSodium}mg</p>
            </div>
          </div>

          {/* Weight input & button */}
          <div className="flex justify-center items-center gap-4">
            <div className="flex flex-col text-sm text-gray-700">
              <label htmlFor="grams">Weight (g):</label>
              <input
                id="grams"
                type="number"
                value={grams}
                onChange={(e) => setGrams(parseInt(e.target.value) || 0)}
                className="border border-gray-300 rounded px-3 py-1 w-24 text-center"
                min={1}
                inputMode="numeric"
              />
            </div>
            <button
              onClick={handleAdd}
              className="bg-yellow-200 hover:bg-yellow-300 text-black font-semibold px-4 py-2 rounded-full"
            >
              Add Today
            </button>
          </div>
        </>
      )}
      {!food && (
        <div className="text-center text-gray-500 mt-4">
          Search for a food item to see its nutritional breakdown.
        </div>
      )}
    </div>
  );
};

export default FoodPreviewCard;
