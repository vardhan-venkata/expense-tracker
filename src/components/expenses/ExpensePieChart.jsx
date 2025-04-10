import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#A020F0", "#FFA500", "#FFD700"]; // Food, Entertainment, Travel
const CATEGORY_LABELS = ["Food", "Entertainment", "Travel"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={"middle"} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ExpensePieChart = ({ expenseList }) => {
  // Group expenses by category and calculate totals
  const categoryTotals = expenseList.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = 0;
    acc[item.category] += parseFloat(item.price);
    return acc;
  }, {});

  const data = CATEGORY_LABELS.map((category) => ({
    name: category,
    value: categoryTotals[category] || 0,
  })).filter((entry) => entry.value > 0);

  return (
    <div className="bg-gray-600 rounded-xl p-6 w-full md:w-[300px] flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹ ${value}`} />
        </PieChart>
      </ResponsiveContainer>

      {/* Manual Legend */}
      <div className="flex justify-center gap-4 mt-4 text-white text-sm">
        {CATEGORY_LABELS.map((category, index) => (
          <div key={category} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: COLORS[index] }}></div>
            <span>{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensePieChart;
