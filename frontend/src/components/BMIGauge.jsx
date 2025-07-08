import React, { useEffect, useState } from "react";

const BMIGauge = ({ bmi }) => {
  const minBMI = 0;
  const maxBMI = 40;

  const [animatedValue, setAnimatedValue] = useState(0);

  // Animate the arc
  useEffect(() => {
    const target = Math.min(Number(bmi), maxBMI);
    const duration = 1000;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newVal = progress * target;
      setAnimatedValue(newVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [bmi]);

  const clamped = Math.max(minBMI, Math.min(animatedValue, maxBMI));
  const arcLength = 282.74;

  const getCategory = (val) => {
    const num = parseFloat(val);
    if (num < 16) return "Very severely underweight";
    if (num < 17) return "Severely underweight";
    if (num < 18.5) return "Underweight";
    if (num < 25) return "Normal";
    if (num < 30) return "Overweight";
    if (num < 35) return "Obese Class I";
    if (num < 40) return "Obese Class II";
    return "Obese Class III";
  };

  const category = getCategory(bmi);

  return (
    <div className="w-full max-w-[300px] mx-auto relative">
      <svg viewBox="0 0 200 100" className="w-full">
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="20"
        />

        {/* Animated colored arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#bmi-gradient)"
          strokeWidth="20"
          strokeDasharray={arcLength}
          strokeDashoffset={arcLength - (clamped / maxBMI) * arcLength}
          strokeLinecap="round"
        />

        {/* Gradient colors */}
        <defs>
          <linearGradient id="bmi-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="30%" stopColor="#facc15" />
            <stop offset="60%" stopColor="#86efac" />
            <stop offset="80%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center BMI and Category */}
      {/* Center BMI and Category */}
      <div className="absolute inset-0 top-[70%] flex flex-col items-center justify-start text-center">
        <p className="text-4xl font-bold text-gray-800">
          {Number(bmi).toFixed(1) || "0.0"}
        </p>
        <p className="text-sm text-gray-500">BMI</p>
        <p className="inline-block mt-2 px-3 py-1 text-sm font-semibold text-black bg-yellow-200 rounded-full ">
          {category}
        </p>
      </div>
    </div>
  );
};

export default BMIGauge;
