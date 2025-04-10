import React from "react";
import { FaUtensils, FaFilm, FaCar, FaTrashAlt, FaEdit } from "react-icons/fa";

function getCategoryIcon(category) {
  switch (category.toLowerCase()) {
    case "food":
      return <FaUtensils className="text-xl text-gray-600" />;
    case "entertainment":
      return <FaFilm className="text-xl text-gray-600" />;
    case "travel":
      return <FaCar className="text-xl text-gray-600" />;
    default:
      return <FaUtensils className="text-xl text-gray-600" />;
  }
}

function ExpenseList({ expenseList, handleExpenseForm, handleDeleteExpense }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      {expenseList && expenseList.length > 0 ? (
        <ul className="divide-y divide-gray-300">
          {expenseList.map((expense, index) => (
            <li key={index} className="flex justify-between items-center py-3">
              <div className="flex items-center gap-4">
                {getCategoryIcon(expense.category)}
                <div className="flex flex-col">
                  <span className="font-semibold text-black">
                    {expense.title}
                  </span>
                  <span className="text-sm text-black">{expense.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-orange-400 font-semibold">
                  ₹{expense.price}
                </span>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow"
                  onClick={() => handleDeleteExpense(expense.key)}
                >
                  <FaTrashAlt />
                </button>
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-full shadow"
                  onClick={() => handleExpenseForm("Edit", expense)}
                >
                  <FaEdit />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-black">No expenses added yet.</p>
      )}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button className="bg-gray-200 text-black px-2 rounded-full">←</button>
        <span className="bg-green-600 text-white px-3 py-1 rounded">1</span>
        <button className="bg-gray-200 text-black px-2 rounded-full">→</button>
      </div>
    </div>
  );
}

export default ExpenseList;
