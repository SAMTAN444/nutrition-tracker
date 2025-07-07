import { useState } from "react";
import { Calculator } from "lucide-react";

const BMIInputCard = ({ onCalculate }) => {
  const [age, setAge] = useState(22);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [gender, setGender] = useState("male");

  const handleSubmit = () => {
    const heightM = height / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);
    onCalculate(bmi);
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="text-purple-500 w-6 h-6" />
        <h2 className="text-center text-lg font-bold text-gray-800">
          BMI Calculator
        </h2>
      </div>

      {/* Age & Weight */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center bg-purple-50 rounded-xl;l p-4">
          <p className="text-sm text-gray-500">Age</p>
          <p className="text-3xl font-bold text-purple-600">{age} </p>
          <div className="flex justify-center gap-3 mt-2">
            <button
              onClick={() => setAge(age + 1)}
              className="w-7 h-7 bg-yellow-200 hover:bg-yellow-300 rounded-full text-lg font-bold shadow"
            >
              +
            </button>
            <button
              onClick={() => setAge(age - 1)}
              className="w-7 h-7 bg-purple-200 hover:bg-purple-300 rounded-full text-lg font-bold shadow"
            >
              -
            </button>
          </div>
        </div>

        <div className="text-center bg-purple-50 rounded-xl p-4">
          <p className="text-sm text-gray-500">Weight (KG)</p>
          <p className="text-3xl font-bold text-purple-600">{weight}</p>
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
      </div>

      {/* Height */}
      <div className="bg-purple-50 rounded-xl p-4 text-center mt-3">
        <p className="text-sm text-gray-500">Height (CM)</p>
        <p className="text-3xl font-bold text-purple-600">{height}</p>

        <input
          type="range"
          min="100"
          max="220"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="w-full h-2 bg-purple-300"
        />
      </div>
    </div>
  );
};

export default BMIInputCard;
