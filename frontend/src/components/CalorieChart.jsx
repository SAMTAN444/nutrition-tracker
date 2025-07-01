import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", calories: 1200 },
  { month: "Feb", calories: 600 },
  { month: "Mar", calories: 1400 },
  { month: "Apr", calories: 1100 },
  { month: "May", calories: 800 },
  { month: "Jun", calories: 1000 },
  { month: "Jul", calories: 1200 },
  { month: "Aug", calories: 900 },
  { month: "Sep", calories: 1800, highlight: true },
  { month: "Oct", calories: 1300 },
  { month: "Nov", calories: 700 },
  { month: "Dec", calories: 1000 },
];

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
  return (
    <div className="w-[700px] p-6 mt-10 ml-10">
      <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Calories</h2>
          <select className="bg-purple-100 text-sm px-2 py-1 rounded-full text-gray-700">
            <option>Month</option>
          </select>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="#999" />
            <YAxis stroke="#ccc" />
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
                    y={y}
                    width={width}
                    height={height}
                    fill={color}
                    rx={4}
                    ry={4}
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
