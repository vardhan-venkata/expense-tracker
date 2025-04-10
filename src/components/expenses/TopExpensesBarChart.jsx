import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CATEGORY_LABELS = ["Food", "Entertainment", "Travel"];
const COLORS = ["#A020F0", "#FFA500", "#FFD700"];

const TopExpensesBarChart = ({ expenseList }) => {
  // Aggregate totals per category
  const categoryTotals = expenseList.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = 0;
    acc[item.category] += parseFloat(item.price);
    return acc;
  }, {});

  const data = CATEGORY_LABELS.map((category) => ({
    name: category,
    value: categoryTotals[category] || 0,
  }))
    .filter((entry) => entry.value > 0)
    .sort((a, b) => b.value - a.value); // Sort descending by value

  return (
    <div className="bg-white rounded-xl p-6 w-full text-black">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" width={100} />
          <Tooltip formatter={(value) => `₹ ${value}`} />
          <Bar dataKey="value" radius={[5, 5, 5, 5]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#9370DB" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopExpensesBarChart;
