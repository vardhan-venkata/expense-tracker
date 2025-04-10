import React from "react";

function ExpenseCard({ expenses, onAddExpense }) {
  return (
    <div className="flex-1 bg-gray-400 h-[200px] p-5 rounded-lg flex flex-col justify-center items-center gap-5 min-w-[250px]">
      <p className="text-2xl font-bold">
        Expenses :{" "}
        <span className=" text-orange-400">
          {" "}
          $ {parseFloat(expenses).toFixed(2) || 0.0}
        </span>
      </p>
      <button
        type="button"
        className="bg-red-500 text-white p-2 rounded"
        onClick={() => onAddExpense("Add", {})}
      >
        + Add Expense
      </button>
    </div>
  );
}

export default ExpenseCard;
