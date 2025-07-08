import AICoach from "../components/AICoach";
import Navbar from "../components/Navbar";
import CalorieChart from "../components/CalorieChart";
import FoodSummary from "../components/FoodSummary";
import BMICard from "../components/BMICard";
import FoodPreviewCard from "../components/FoodPreview";
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
              <FoodSummary />
            </div>
          </div>

          {/* Bottom Row: 3 Small Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-center">
              <BMICard />
            </div>

            <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-center">
              <FoodPreviewCard
                food={{
                  name: "Cheeseburger",
                  image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg", // or any burger image
                  calories: 303,
                  protein: 57.1,
                  fat: 133.4,
                  sodium: 663,
                  carbs: 112.5,
                }}
                onAdd={(food) => console.log("Added food:", food)}
              />
            </div>

            <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-center">
              {/* Meditation or AICoach placeholder */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
