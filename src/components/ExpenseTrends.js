// components/ExpenseBarChart.js
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ExpenseTrends = ({ expenses }) => {
  const dataMap = {};

  expenses
    .filter((e) => e.amount < 0)
    .forEach((e) => {
      const month = new Date(e.date).toLocaleString("default", {
        month: "short",
      });
      if (!dataMap[month]) dataMap[month] = 0;
      dataMap[month] += Math.abs(e.amount);
    });

  const chartData = Object.keys(dataMap).map((month) => ({
    name: month,
    amount: dataMap[month],
  }));

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-lg font-bold mb-2">Expense Trends</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseTrends;
