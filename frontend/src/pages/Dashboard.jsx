import FoodInput from "../components/FoodInput";
import ProteinProgress from "../components/ProteinProgress";
import ActivityInput from "../components/ActivityInput";
import AICoach from "../components/AICoach";
import Navbar from "../components/Navbar"
import CalorieChart from "../components/CalorieChart";
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
      <div className="max-w-2xl mx-auto p-4">
         <Navbar />
        <h1 className="text-2xl font-bold mb-4">Health Dashboard</h1>
        <FoodInput onSubmit={handleFoodSubmit} />
        <ProteinProgress current={protein} goal={proteinGoal} />
        <CalorieChart />
        {/* 
        <ActivityInput onSubmit={handleStepsSubmit} />
        <AICoach calores={calories} protein={protein} goal={proteinGoal} />
        */}
      </div>
    </>
  );
};

export default Dashboard;
