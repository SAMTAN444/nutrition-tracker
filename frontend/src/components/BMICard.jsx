import { useState } from "react";
import BMIInputCard from "./BMIInputCard";
import BMIResultCard from "./BMIResultCard";


const BMICard = () => {
    const [bmi, setBmi] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = (value) => {
        setLoading(true);
        setTimeout(() => {
            setBmi(value);
            setLoading(false);
        }, 2000);
    };

    const handleReset  = () => {
        setBmi(null);
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl p-6 flex items-center justify-center h-80 w-full max-w-md">
                <div className="animate-spin h-10 w-10 border-t-4 border-purple-500 rounded-full" />
            </div>
        );
    }

    return bmi ? (
        <BMIResultCard bmi={bmi} onBack={handleReset} />
    ) : (
        <BMIInputCard onCalculate={handleCalculate} />
    )
}

export default BMICard;