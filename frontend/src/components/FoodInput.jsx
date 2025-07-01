import { useState } from "react";

const FoodInput = ({onSubmit}) => {
    const [food, setFood] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        if (food.trim()) {
            onSubmit(food);
            setFood("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Intake
            </label>
            <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="e.g. chicken rice, egg"
                value={food}
                onChange={(e) => setFood(e.target.value)}
            />
            <button 
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >Submit
            </button>
        </form>
    )
}

export default FoodInput;