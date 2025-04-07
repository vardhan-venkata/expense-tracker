import React, { useState, useEffect } from "react";
import "./ExpenseForm.css";

function ExpenseForm({ onAddExpense, onClose, editingExpense }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData(editingExpense);
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, price, category, date } = formData;
    if (!title || !price || !category || !date) {
      alert("Please fill in all fields.");
      return;
    }

    onAddExpense({ ...formData, price: Number(price) });
    setFormData({ title: "", price: "", category: "", date: "" });
  };

  return (
    <div className="modal-backdrop">
      <div className="expense-form-modal">
        <h2>{editingExpense ? "Edit Expense" : "Add Expense"}</h2>
        <form onSubmit={handleSubmit} className="expense-form">
          <input
            type="text"
            name="title"
            placeholder="Expense Title"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Amount"
            value={formData.price}
            onChange={handleChange}
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <div className="expense-form-actions">
            <button type="submit">
              {editingExpense ? "Update" : "Add"} Expense
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
