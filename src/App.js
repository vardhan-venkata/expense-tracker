// App.js
import { useState, useEffect } from "react";
import WalletBalance from "./components/WalletBalance";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseTrends from "./components/ExpenseTrends";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addOrUpdateExpense = (data) => {
    if (editData) {
      setExpenses((prev) =>
        prev.map((item) =>
          item.id === editData.id ? { ...data, id: editData.id } : item
        )
      );
      setEditData(null);
    } else {
      setExpenses((prev) => [...prev, { ...data, id: Date.now() }]);
    }
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const totalIncome = expenses
    .filter((e) => e.amount > 0)
    .reduce((a, b) => a + b.amount, 0);
  const totalExpense = expenses
    .filter((e) => e.amount < 0)
    .reduce((a, b) => a + b.amount, 0);
  const balance = totalIncome + totalExpense;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <WalletBalance
        income={totalIncome}
        expense={totalExpense}
        balance={balance}
      />
      <ExpenseForm
        onSubmit={addOrUpdateExpense}
        editData={editData}
        onCancelEdit={() => setEditData(null)}
      />
      <ExpenseList
        expenses={expenses}
        onEdit={setEditData}
        onDelete={deleteExpense}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <ExpenseSummary expenses={expenses} />
        <ExpenseTrends expenses={expenses} />
      </div>
    </div>
  );
};

export default App;
