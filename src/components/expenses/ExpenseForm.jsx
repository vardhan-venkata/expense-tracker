import React from "react";
import ReactModal from "react-modal";

function ExpenseForm({
  type = "Add",
  expenseFormData,
  setExpenseFormData,
  onClose,
  showExpenseForm,
  setShowExpenseForm,
  handleExpenseSubmit,
}) {
  console.log("expenseFormData", expenseFormData);
  const handleExpenseFormChange = (key, value) => {
    setExpenseFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ReactModal
      isOpen={showExpenseForm}
      onRequestClose={onClose}
      onAfterClose={onClose}
      className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-xl w-[500px] mx-auto outline-none"
      overlayClassName="fixed inset-0 bg-gray-200 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div className="text-black w-full">
        <h2 className="text-xl font-bold mb-4 text-center">{type} Expense</h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={expenseFormData?.title || ""}
            className="border border-gray-300 rounded-md px-4 py-2 shadow-sm"
            onChange={(e) => handleExpenseFormChange("title", e.target.value)}
          />

          <input
            type="number"
            name="price"
            placeholder="Amount"
            value={expenseFormData?.price || ""}
            className="border border-gray-300 rounded-md px-4 py-2 shadow-sm"
            onChange={(e) =>
              handleExpenseFormChange("price", parseFloat(e.target.value))
            }
          />

          <select
            value={expenseFormData.category}
            name="category"
            onChange={(e) =>
              handleExpenseFormChange("category", e.target.value)
            }
            className="border border-gray-300 rounded-md px-4 py-2 shadow-sm"
          >
            <option value="">Select Category</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
          </select>

          <input
            type="date"
            name="date"
            value={expenseFormData?.date || ""}
            className="border border-gray-300 rounded-md px-4 py-2 shadow-sm"
            onChange={(e) => handleExpenseFormChange("date", e.target.value)}
          />

          <div className="flex justify-between gap-4 mt-4">
            <button
              type="submit"
              onClick={() => handleExpenseSubmit(expenseFormData)}
              className="bg-yellow-400 text-white px-4 py-2 rounded-md shadow w-full"
            >
              {type} Expense
            </button>
            <button
              onClick={() => setShowExpenseForm(false)}
              className="bg-gray-200 text-black px-4 py-2 rounded-md shadow w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default ExpenseForm;
