import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplet } from "lucide-react";

const WaterIntake = () => {
  const goal = 5.0;
  const [water, setWater] = useState(0);
  const [inputAmount, setInputAmount] = useState("");
  const [lastTime, setLastTime] = useState("");
  const [rippleKey, setRippleKey] = useState(0); // to reset animation

  const updateTime = () => {
    const now = new Date();
    const formatted = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setLastTime(formatted);
  };

  const handleAdd = (amount) => {
    const updated = Math.min(water + amount, goal);
    setWater(updated);
    updateTime();
    setRippleKey(prev => prev + 1); // trigger ripple
  };

  const handleSubtract = () => {
    const updated = Math.max(water - 0.1, 0);
    setWater(updated);
    updateTime();
  };

  const handleInput = () => {
    const value = parseFloat(inputAmount);
    if (!isNaN(value) && value > 0) {
      handleAdd(value);
      setInputAmount("");
    }
  };

  const handleSet = () => {
    const value = parseFloat(inputAmount);
    if (!isNaN(value) && value >= 0) {
      const updated = Math.min(value, goal);
      setWater(updated);
      setInputAmount("");
      updateTime();
    }
  };

  const percentage = Math.min((water / goal) * 100, 100);

  return (
    <div className="relative w-full h-full bg-white rounded-2xl p-6 overflow-hidden flex flex-col lg:flex-row justify-between items-center gap-6">
      {/* 🧠 Left Side */}
      <div className="z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
        <div className="flex items-center gap-2 mb-3">
          <Droplet className="w-7 h-7 text-blue-500" />
          <h3 className="text-xl font-bold text-black">Water Intake</h3>
        </div>

        <p className="text-5xl font-bold text-blue-600 mb-1">
          {water.toFixed(1)} <span className="text-xl text-gray-500">/ {goal}L</span>
        </p>

        <div className="flex flex-wrap justify-center lg:justify-start gap-2 bg-purple-50 px-4 py-3 rounded-xl shadow-sm mt-2 mb-2">
          <button
            onClick={() => handleAdd(0.1)}
            className="w-9 h-9 bg-yellow-200 hover:bg-yellow-300 rounded-full text-lg font-bold shadow"
          >
            +
          </button>
          <button
            onClick={handleSubtract}
            className="w-9 h-9 bg-purple-200 hover:bg-purple-300 rounded-full text-lg font-bold shadow"
          >
            −
          </button>
          <input
            type="number"
            step="0.1"
            placeholder="e.g. 0.3"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            className="w-20 text-sm px-3 py-1 text-center border border-gray-400 rounded-full shadow-sm"
          />
          <button
            onClick={handleInput}
            className="bg-purple-200 hover:bg-purple-300 text-black font-semibold text-sm px-4 py-1 rounded-full shadow-sm"
          >
            Add
          </button>
          <button
            onClick={handleSet}
            className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold text-sm px-4 py-1 rounded-full shadow-sm"
          >
            Set
          </button>
        </div>

        <p className="text-xs text-gray-400">Last update: {lastTime || "–"}</p>
      </div>

      {/* 🧪 Bottle */}
      <div className="relative w-20 h-52 bg-gray-200 rounded-t-[40%] rounded-b-full overflow-hidden shadow-inner flex items-end justify-center z-10">
        {/* 💦 Water Fill (solid color) */}
        <motion.div
          animate={{ height: `${percentage}%` }}
          transition={{ duration: 0.1, type: "spring", bounce: 0.4 }}
          className="absolute bottom-0 w-full bg-blue-400"
        />



        {/* % label */}
        <span className="absolute top-2 text-sm font-bold text-gray-700 z-10">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};

export default WaterIntake;
