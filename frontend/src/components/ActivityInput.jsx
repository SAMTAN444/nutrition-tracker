import { useState } from "react";

const ActivityInput = ({ onSubmit }) => {
    const [steps, setSteps] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsed = parseInt(steps);
        if (!isNaN(parsed)) {
            onSubmit(parsed);
            setSteps("");
        }
    }
    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Steps Today</label>
            <input 
                type="number"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter number of steps"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
            />
            <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    )
}

export default ActivityInput