import ProteinProgress from "../components/ProteinProgress";
import AICoach from "../components/AICoach";
import Navbar from "../components/Navbar";
import CalorieChart from "../components/CalorieChart";
import WaterIntake from "../components/WaterIntake";
import FoodSummary from "../components/FoodSummary";
import { useState } from "react";

const Dashboard = () => {
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(50);
  const [steps, setSteps] = useState(0);
  const proteinGoal = 130;

  const handleFoodSubmit = (food) => {
    // mock: replace with API call
    const mockCalories = 350;
    const mockProtein = 30;
    setCalories((c) => c + mockCalories);
    setProtein((p) => p + mockProtein);
  };

  const handleStepsSubmit = (numSteps) => {
    setSteps(numSteps);
  };
  return (
    <>
      <div className="min-h-screen bg-white pt-35 pl-20">
        <Navbar />
        {/* Main Content */}
        <div className="flex-1 px-10 pt-10">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800">Hi, Sam!</h1>
            <p className="text-lg text-gray-500 mt-1">Health Dashboard</p>
          </div>

          {/* Top Row: 2 Long Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 mb-6">
            <div className="bg-[#f4f4f5] rounded-2xl shadow p-6 flex items-center justify-center">
              <CalorieChart />
            </div>

            <div className="bg-[#f4f4f5] rounded-2xl shadow p-6 flex items-center justify-center">
              <FoodSummary />
            </div>
          </div>

          {/* Bottom Row: 3 Small Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#f4f4f5] rounded-2xl shadow p-6 flex items-center justify-center">
   
            </div>

            <div className="bg-[#f4f4f5] rounded-2xl shadow p-6 flex items-center justify-center">
              <WaterIntake />
            </div>

            <div className="bg-[#f4f4f5] rounded-2xl shadow p-6 flex items-center justify-center">
              {/* Meditation or AICoach placeholder */}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
