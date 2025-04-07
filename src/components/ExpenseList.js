import React from "react";
import "./ExpenseList.css";

function ExpenseList({ expenses, onDelete, onEdit }) {
  if (expenses.length === 0) {
    return <p className="no-expenses">No expenses added yet.</p>;
  }

  return (
    <div className="expense-list">
      <h2 className="expense-list-heading">Expense History</h2>
      {expenses.map((expense) => (
        <div key={expense.id} className="expense-item">
          <div className="expense-info">
            <h3>{expense.title}</h3>
            <p>${expense.price}</p>
            <p>{expense.category}</p>
            <p>{new Date(expense.date).toLocaleDateString()}</p>
          </div>
          <div className="expense-actions">
            <button onClick={() => onEdit(expense)} className="edit-btn">
              Edit
            </button>
            <button onClick={() => onDelete(expense.id)} className="delete-btn">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
