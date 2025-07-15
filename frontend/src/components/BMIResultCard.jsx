import BMIGauge from "./BMIGauge";

const BMIResultCard = ({ bmi, onBack }) => {
  

  return (
    <div className="bg-white rounded-2xl p-6 w-full max-w-md text-center ">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Body Mass Index</h2>
      <BMIGauge bmi={bmi} />

      <div className="mt-17 text-sm text-left space-y-1 font-medium text-gray-700">
        <p><span className="text-sky-400">●</span> Very severely underweight: BMI &lt; 16.0</p>
        <p><span className="text-sky-300">●</span> Severely underweight: BMI 16.0 – 16.9</p>
        <p><span className="text-blue-400">●</span> Underweight: BMI 17.0 – 18.4</p>
        <p><span className="text-green-500">●</span> Normal: BMI 18.5 – 24.9</p>
        <p><span className="text-yellow-400">●</span> Overweight: BMI 25.0 – 29.9</p>
        <p><span className="text-orange-400">●</span> Obese Class I: BMI 30.0 – 34.9</p>
        <p><span className="text-orange-500">●</span> Obese Class II: BMI 35.0 – 39.9</p>
        <p><span className="text-red-500">●</span> Obese Class III: BMI ≥ 40.0</p>
      </div>
      
      <button
        onClick={onBack}
        className="mt-6 w-full bg-purple-500 text-white py-2 rounded-md font-semibold hover:bg-purple-600 transition"
      >
        Recalculate
      </button>
    </div>
  );
};

export default BMIResultCard;
