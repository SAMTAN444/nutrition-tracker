import { useState } from "react";
import { motion } from "framer-motion";
import { Droplet } from "lucide-react"; // water icon

const WaterIntake = () => {
  const goal = 5.0;
  const [water, setWater] = useState(0);
  const [inputAmount, setInputAmount] = useState("");
  const [lastTime, setLastTime] = useState("");

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
    <div className="w-full h-full bg-[#f4f4f5] rounded-2xl p-6 flex flex-col lg:flex-row justify-center items-center gap-8">
      {/* Left side: text and buttons */}
      <div className="flex flex-col items-center lg:items-start">
        <div className="flex items-center gap-2 mb-2">
          <Droplet className="w-6 h-6 text-blue-400" />
          <h3 className="text-m font-semibold text-gray-800">Water Intake</h3>
        </div>

        <p className="text-3xl font-bold text-gray-900 mb-4">
          {water.toFixed(1)} <span className="text-lg font-medium">/ {goal}L</span>
        </p>

        <div className="flex items-center gap-2 flex-wrap mb-2">
          <button
            onClick={() => handleAdd(0.1)}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-yellow-200 flex items-center justify-center text-black text-lg"
          >
            +
          </button>
          <button
            onClick={handleSubtract}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-yellow-200 flex items-center justify-center text-black text-lg"
          >
            −
          </button>
          <input
            type="number"
            step="0.1"
            placeholder="e.g. 0.3"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm w-24"
          />
          <button
            onClick={handleInput}
            className="bg-purple-200 hover:bg-purple-300 text-black px-4 py-1 rounded text-sm"
          >
            Add
          </button>
          <button
            onClick={handleSet}
            className="bg-yellow-300 hover:bg-yellow-400 text-black px-4 py-1 rounded text-sm"
          >
            Set
          </button>
        </div>

        <p className="text-xs text-gray-500">Last time {lastTime}</p>
      </div>

      {/* Right side: meter bar */}
      <div className="relative h-48 w-14 rounded-b-full bg-gray-300 overflow-hidden flex items-end justify-center">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${percentage}%` }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
          className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-300"
        />
        <span className="absolute top-2 text-sm font-bold text-gray-800">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};

export default WaterIntake;
