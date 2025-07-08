import { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { UtensilsCrossed } from "lucide-react";

const FoodPreviewCard = ({ food, onAdd }) => {
  const [grams, setGrams] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");

  const getAdjusted = (val) => ((val * grams) / 150).toFixed(1);

  const data = [
    { name: "Carbs", value: food.carbs, color: "#ef4444" },
    { name: "Protein", value: food.protein, color: "#facc15" },
    { name: "Fat", value: food.fat, color: "#3b82f6" },
  ];

  const totalMacros = food.carbs + food.protein + food.fat;
  const adjustedCalories = ((food.calories * grams) / 150).toFixed(1);
  const adjustedSodium = getAdjusted(food.sodium);

  const handleAdd = () => {
    onAdd({ ...food, grams });
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-2 mt-4 mb-4">
        <UtensilsCrossed className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">Food Macros</h2>
      </div>
    
    {/* Search Bar */}
    <div className="flex items-center gap-2 mb-4">
        <input 
            type="text"
            value={searchTerm}
            onChange= {(e) => setSearchTerm(e.target.value)}
            placeholder="Search for food..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2  focus:ring-purple-400"
        />
    </div>

      {/* Food Image */}
      <div className="w-full h-40 overflow-hidden rounded-xl mb-4">
        <img
          src={food.image || "https://via.placeholder.com/300"}
          alt={food.name}
          className="w-full h-full object-cover"
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
                <span className="text-gray-700 font-medium">{item.name}</span>
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
    </div>
  );
};

export default FoodPreviewCard;
