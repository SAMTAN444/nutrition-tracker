import AICoach from "../components/AICoach";
import Navbar from "../components/Navbar";
import CalorieChart from "../components/CalorieChart";
import FoodSummary from "../components/FoodSummary";
import BMICard from "../components/BMICard";
import FoodPreviewCard from "../components/FoodPreview";
import NutritionAnalyzer from "../components/NutritionAnalyzer";
import { useState, useRef, useEffect } from "react";

const Dashboard = () => {
  const foodSummaryRef = useRef();
  const analyzeRef = useRef();
  const [summaryData, setSummaryData] = useState([]);

  const handleAnalyzeClick = () => {
    const date = foodSummaryRef.current?.getSummaryData();
    if (date) setSummaryData([date]);
    analyzeRef.current?.() // triggers handleSubmit
  };

  return (
    <>
      <div className="min-h-screen bg-[#fef9f5] pt-35 pl-20">
        <Navbar />
        {/* Main Content */}
        <div className="flex-1 px-10 pt-10">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-5xl font-extrabold text-black drop-shadow-md">
              Hi, Sam!
            </h1>
            <p className="text-lg text-gray-700 mt-1">Health Dashboard</p>
          </div>

          {/* Top Row: 2 Long Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 mb-6">
            <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-center">
              <CalorieChart />
            </div>

            <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-center">
              <FoodSummary ref={foodSummaryRef} />
            </div>
          </div>

          {/* Bottom Row: 3 Small Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-center">
              <BMICard />
            </div>

            <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-center">
              <FoodPreviewCard
                onAdd={() => foodSummaryRef.current?.refresh()}
              />
            </div>

            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
              <NutritionAnalyzer calorieData={summaryData} onTriggerAnalyze={analyzeRef}/>
              <button
                onClick={handleAnalyzeClick}
                className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition"
              >
                Analyze Intake
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
