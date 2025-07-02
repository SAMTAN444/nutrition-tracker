import { useState } from "react";
import { motion } from "framer-motion";

const StepsTracker = () => {
  const goal = 10000; // daily steps goal
  const [steps, setSteps] = useState(4000);
  const [input, setInput] = useState("");
  const percentage = Math.min((steps / goal) * 100, 100);

  const handleAdd = () => {
    const value = parseInt(input);
    if (!isNaN(value) && value > 0) {
      setSteps((prev) => Math.min(prev + value, goal));
      setInput("");
    }
  };

  const handleSet = () => {
    const value = parseInt(input);
    if (!isNaN(value) && value >= 0) {
      setSteps(Math.min(value, goal));
      setInput("");
    }
  };

  return (
    <div className="w-full h-full bg-[#f4f4f5] rounded-2xl p-6 flex flex-col items-start gap-4">
      <h3 className="text-sm font-semibold text-gray-800">Steps Today</h3>

      <p className="text-2xl font-bold text-gray-900">
        {steps.toLocaleString()} <span className="text-lg font-medium">/ {goal.toLocaleString()}</span>
      </p>

      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="e.g. 1000"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-1 text-sm w-24"
        />
        <button
          onClick={handleAdd}
          className="bg-purple-200 hover:bg-purple-300 text-black px-3 py-1 rounded text-sm"
        >
          Add
        </button>
        <button
          onClick={handleSet}
          className="bg-yellow-200 hover:bg-yellow-300 text-black px-3 py-1 rounded text-sm"
        >
          Set
        </button>
      </div>

      <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden mt-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
          className="h-full bg-gradient-to-r from-yellow-400 to-purple-400"
        />
      </div>

      <span className="text-sm font-medium text-gray-700">{percentage.toFixed(0)}%</span>
    </div>
  );
};

export default StepsTracker;
