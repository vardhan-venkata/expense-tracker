// components/ExpensePieChart.js
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

const ExpenseSummary = ({ expenses }) => {
  const data = expenses
    .filter((e) => e.amount < 0)
    .reduce((acc, curr) => {
      const found = acc.find((item) => item.name === curr.category);
      if (found) {
        found.value += Math.abs(curr.amount);
      } else {
        acc.push({ name: curr.category, value: Math.abs(curr.amount) });
      }
      return acc;
    }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-lg font-bold mb-2">Expense Summary</h2>
      <PieChart width={300} height={250}>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ExpenseSummary;
