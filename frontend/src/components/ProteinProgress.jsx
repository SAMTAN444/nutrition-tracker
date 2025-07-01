import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProteinProgress = ({ current, goal }) => {
  const percentage = Math.min(((current / goal) * 100).toFixed(2), 100);
  console.log(`${percentage}`)

  return (
    <div className="w-36 h-36">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textSize: "18px",
          pathColor: "#a78bfa", // violet-400
          textColor: "#111827", // gray-900
          trailColor: "#e5e7eb", // gray-200
          strokeLinecap: "round",
        })}
      />
      <p className="text-center text-lg mt-2">Protein goal</p>
    </div>
  );
};
export default ProteinProgress;
