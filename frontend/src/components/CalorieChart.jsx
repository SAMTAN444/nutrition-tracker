import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Flame } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white text-sm px-3 py-2 rounded-lg shadow border border-gray-200">
      <p className="font-semibold text-gray-800">{label}</p>
      <p className="text-purple-500">
        calories: {payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};

const CalorieChart = () => {
  const [data, setData] = useState([]);
  const [range, setRange] = useState(7);
  const [viewMode, setViewMode] = useState("day");

  useEffect(() => {
    const fetchCalories = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5175/api/nutrition/daily-calories?days=${range}`
        );
        const raw = res.data;

        // 1. Generate list of all dates in range
        const today = new Date();
        const allDates = [];
        for (let i = range - 1; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          const iso = d.toISOString().split("T")[0];
          allDates.push(iso);
        }

        // 2. Convert MongoDB results to a lookup
        const calorieMap = {};
        raw.forEach((entry) => {
          calorieMap[entry.date] = entry.calories;
        });

        // 3. Fill missing dates with 0 and apply label + highlight
        const filled = allDates.map((date) => ({
          date,
          calories: calorieMap[date] || 0,
          label: new Date(date).toLocaleDateString("en-SG", {
            month: "short",
            day: "numeric",
          }),
          highlight: date === today.toISOString().split("T")[0],
        }));

        // 4. Group by week if needed
        if (viewMode === "week") {
          const grouped = {};
          filled.forEach((entry) => {
            const d = new Date(entry.date);
            const weekStart = new Date(d);
            weekStart.setDate(d.getDate() - d.getDay());

            const label = weekStart.toLocaleDateString("en-SG", {
              month: "short",
              day: "numeric",
            });

            grouped[label] = (grouped[label] || 0) + entry.calories;
          });

          const result = Object.entries(grouped).map(([label, calories]) => ({
            label,
            calories,
          }));

          setData(result);
        } else {
          setData(filled);
        }
      } catch (err) {
        console.error("Failed to fetch calorie data:", err);
      }
    };

    fetchCalories();
  }, [range, viewMode]);

  return (
    <div className="h-full w-full">
      {/* Section Title */}
      <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
        <Flame className="w-6 h-6 text-red-400" />
        Calories
      </h2>
      <div className="p-0">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm  ${
                viewMode === "day" ? "bg-purple-300 text-black" : "bg-gray-100" 
              }`}
              onClick={() => setViewMode("day")}
            >
              By Day
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                viewMode === "week" ? "bg-purple-300 text-black" : "bg-gray-100"
              }`}
              onClick={() => setViewMode("week")}
            >
              By Week
            </button>
          </div>

          <select
            className="bg-purple-300 text-sm px-3 py-1 rounded-full text-black"
            value={range}
            onChange={(e) => setRange(Number(e.target.value))}
          >
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis
              dataKey="label"
              stroke="#71717A" // light gray (Tailwind slate-300)
              axisLine={{ stroke: "#71717A" }}
              tickLine={false}
            />
            <YAxis
              stroke="#71717A"
              axisLine={{ stroke: "#71717A" }}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />

            <Bar
              dataKey="calories"
              radius={[4, 4, 0, 0]}
              fill="#f3f3c7" // Tailwind yellow-100
              isAnimationActive={false}
              activeBar={false}
              activeShape={() => null}
              shape={(props) => {
                const { fill, x, y, width, height, payload } = props;
                const color = payload.highlight ? "#c4b5fd" : fill; // purple-200
                return (
                  <rect
                    x={x}
                    y={y - 1}
                    width={width}
                    height={height}
                    fill={color}
                    rx={0}
                    ry={0}
                  />
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CalorieChart;
