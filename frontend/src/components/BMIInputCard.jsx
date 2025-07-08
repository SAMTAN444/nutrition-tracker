import { useState } from "react";
import { Calculator } from "lucide-react";

const BMIInputCard = ({ onCalculate }) => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);

  const handleSubmit = () => {
    const heightM = height / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);
    onCalculate(bmi);
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full h-full mb-3 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="text-purple-500 w-6 h-6" />
        <h2 className="text-center text-lg font-bold text-gray-800">
          BMI Calculator
        </h2>
      </div>

      {/* Weight */}
      <div className="text-center bg-purple-50 rounded-xl p-4 mb-3">
        <p className="text-sm text-gray-500">Weight (KG)</p>
        <p className="text-3xl font-bold text-black">{weight}</p>
        <div className="flex justify-center gap-3 mt-2">
          <button
            onClick={() => setWeight(weight + 1)}
            className="w-7 h-7 bg-yellow-200 hover:bg-yellow-300 rounded-full text-lg font-bold shadow"
          >
            +
          </button>
          <button
            onClick={() => setWeight(weight - 1)}
            className="w-7 h-7 bg-purple-200 hover:bg-purple-300 rounded-full text-lg font-bold shadow"
          >
            -
          </button>
        </div>
      </div>

      {/* Height */}
      <div className="bg-purple-50 rounded-xl p-4 text-center mb-3">
        <p className="text-sm text-gray-500">Height (CM)</p>
        <p className="text-3xl font-bold text-black">{height}</p>

        <input
          type="range"
          min="50"
          max="250"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="w-full h-2 accent-purple-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>50 cm</span>
          <span>250 cm</span>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-yellow-200 mt-3 text-black py-3 text-lg font-semibold rounded-full hover:bg-yellow-300 transition"
      >
        Calculate BMI
      </button>
    </div>
  );
};

export default BMIInputCard;
