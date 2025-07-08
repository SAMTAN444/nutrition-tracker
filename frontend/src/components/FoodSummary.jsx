import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Apple, Pencil } from "lucide-react";

const FoodSummary = () => {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [editItem, setEditItem] = useState(null);
  const [editValues, setEditValues] = useState({
    protein: "",
    fat: "",
    sodium: "",
    calories: "",
  });

  useEffect(() => {
    fetchFoods();
  }, [selectedDate]);

  const fetchFoods = async () => {
    try {
      const res = await axios.get("http://localhost:5175/api/nutrition", {
        params: { date: selectedDate },
      });
      setFoods(res.data);
    } catch (err) {
      console.error("Failed to fetch foods:", err);
    }
  };

  const handleAddFood = async () => {
    if (!newFood.trim()) return;
    try {
      const res = await axios.post("http://localhost:5175/api/nutrition", {
        food: newFood,
      });
      setFoods((prev) => [...res.data, ...prev]);
      setNewFood("");
    } catch (err) {
      console.error("Failed to add food:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5175/api/nutrition/${id}`);
      setFoods((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Failed to delete food:", err);
    }
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setEditValues({
      protein: item.protein,
      fat: item.fat,
      sodium: item.sodium,
      calories: item.calories,
    });
  };

  const handleEditSave = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5175/api/nutrition/${editItem._id}`,
        editValues
      );
      setFoods((prev) =>
        prev.map((f) => (f._id === res.data._id ? res.data : f))
      );
      setEditItem(null);
    } catch (err) {
      console.error("Failed to save edits:", err);
    }
  };

  const filteredFoods = foods.filter((f) => {
    const date = new Date(f.createdAt).toISOString().split("T")[0];
    return date === selectedDate;
  });

  const totalProtein = filteredFoods.reduce((sum, f) => sum + f.protein, 0);
  const totalSodium = filteredFoods.reduce((sum, f) => sum + f.sodium, 0);
  const totalFat = filteredFoods.reduce((sum, f) => sum + f.fat, 0);
  const totalCalories = filteredFoods.reduce((sum, f) => sum + f.calories, 0);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Section Title and Date Filter */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
          <Apple className="w-6 h-6 text-purple-500" /> Daily Nutrition
        </h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded-md text-sm"
        />
      </div>

      {/* Macronutrient Summary */}
      <div className="grid grid-cols-4 gap-2 bg-white rounded-xl p-4 text-center mb-4 shadow-sm">
        <div className="min-w-0">
          <p className="text-xs text-gray-500">Protein</p>
          <p className="text-xl font-bold text-purple-500 truncate">
            {totalProtein.toFixed(1)}&nbsp;g
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-gray-500">Fat</p>
          <p className="text-xl font-bold text-yellow-300 truncate">
            {totalFat.toFixed(1)}&nbsp;g
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-gray-500">Sodium</p>
          <p className="text-xl font-bold text-purple-300 truncate">
            {totalSodium.toFixed(2)}&nbsp;mg
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-gray-500">Calories</p>
          <p className="text-xl font-bold text-black truncate">
            {totalCalories.toFixed(2)}&nbsp;kcal
          </p>
        </div>
      </div>

      {/* Add Food Input */}
      <div className="flex gap-2 mb-3">
        <input
          value={newFood}
          onChange={(e) => setNewFood(e.target.value)}
          placeholder="Enter food name"
          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
        <button
          onClick={handleAddFood}
          className="bg-purple-200 hover:bg-purple-300 text-black px-4 rounded-md text-sm"
        >
          Add
        </button>
      </div>

      {/* Food List */}
      <div className="space-y-3 overflow-y-auto max-h-[300px] pr-1">
        {filteredFoods.map((food, index) => (
          <div
            key={index}
            className="bg-white rounded-lg px-4 py-3 flex justify-between items-center shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col">
              <span className="font-medium text-sm text-gray-800">
                {food.name}
              </span>
              <span className="text-xs text-gray-500">
                {food.protein}g P / {food.fat}g F / {food.sodium}mg Na –{" "}
                {food.calories} kcal
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <button
                onClick={() => handleEditClick(food)}
                className="text-gray-400 hover:text-blue-500"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(food._id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white p-6 rounded-xl w-72 shadow-lg space-y-3">
            <h3 className="text-lg font-semibold mb-2 text-center">
              Edit Macros
            </h3>
            <div>
              <label className="block text-xs text-gray-500">Protein (g)</label>
              <input
                value={editValues.protein}
                onChange={(e) =>
                  setEditValues({ ...editValues, protein: e.target.value })
                }
                className="w-full border rounded-md px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Fat (g)</label>
              <input
                value={editValues.fat}
                onChange={(e) =>
                  setEditValues({ ...editValues, fat: e.target.value })
                }
                className="w-full border rounded-md px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Sodium (mg)</label>
              <input
                value={editValues.sodium}
                onChange={(e) =>
                  setEditValues({ ...editValues, sodium: e.target.value })
                }
                className="w-full border rounded-md px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">
                Calories (kcal)
              </label>
              <input
                value={editValues.calories}
                onChange={(e) =>
                  setEditValues({ ...editValues, calories: e.target.value })
                }
                className="w-full border rounded-md px-2 py-1 text-sm"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditItem(null)}
                className="text-xs text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="text-xs bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodSummary;
