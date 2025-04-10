import { useEffect, useState } from "react";
import "./App.css";
import ExpenseCard from "./components/expenses/ExpenseCard";
import ExpenseForm from "./components/expenses/ExpenseForm";
import ExpenseList from "./components/expenses/ExpenseList";
import ExpensePieChart from "./components/expenses/ExpensePieChart";
import TopExpensesBarChart from "./components/expenses/TopExpensesBarChart";
import IncomeForm from "./components/IncomeForm";
import WalletBalance from "./components/walletBalance/WalletBalance";

function App() {
  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [expenseFormType, setExpenseFormType] = useState("Add");
  const [expenseFormData, setExpenseFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  const handleExpenseForm = (action = "Add", expense) => {
    setShowExpenseForm(true);
    setExpenseFormType(action);
    if (expense) {
      setExpenseFormData(expense);
    }
  };

  const closeExpenseForm = () => {
    setExpenseFormType("Add");
    setExpenseFormData({ title: "", price: "", category: "", date: "" });
    setShowExpenseForm(false);
  };

  const handleIncomeForm = () => {
    setShowIncomeForm(true);
  };

  const handleIncomeFormSubmit = (income) => {
    const updatedBalance = parseFloat(balance) + parseFloat(income);
    setBalance(updatedBalance);
    localStorage.setItem("balance", updatedBalance);
    setShowIncomeForm(false);
  };

  const handleExpenseSubmit = (expense) => {
    const parsedPrice = parseFloat(expense.price);

    if (expenseFormType === "Edit") {
      const indexToEdit = expenses.findIndex(
        (e) => e.key === expenseFormData.key
      );
      if (indexToEdit === -1) return;

      const oldExpense = expenses[indexToEdit];
      const priceDifference = parsedPrice - parseFloat(oldExpense.price);
      const updatedBalance = parseFloat(balance) - parseFloat(priceDifference);
      const updatedExpenses = expenses.map((e, index) =>
        index === indexToEdit ? { ...expense, key: oldExpense.key } : e
      );

      if (updatedBalance < 0) {
        alert("Insufficient balance");
        return;
      }

      setBalance(updatedBalance);
      setExpenses(updatedExpenses);
      localStorage.setItem("balance", updatedBalance);
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      setShowExpenseForm(false);
      return;
    }

    const remainingBalance = parseFloat(balance) - parseFloat(parsedPrice);

    if (remainingBalance < 0) {
      alert("Insufficient balance");
      return;
    }

    const newExpense = { ...expense, key: expenses.length + 1 };
    const updatedExpenses = [...expenses, newExpense];

    setBalance(remainingBalance);
    setExpenses(updatedExpenses);
    localStorage.setItem("balance", remainingBalance);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setShowExpenseForm(false);
  };

  const handleDeleteExpense = (expenseKey) => {
    const expenseToDelete = expenses.find(
      (expense) => expense.key === expenseKey
    );
    const updatedExpenses = expenses.filter(
      (expense) => expense.key !== expenseKey
    );

    const updatedBalance = balance + parseFloat(expenseToDelete.price);

    setBalance(updatedBalance);
    setExpenses(updatedExpenses);
    localStorage.setItem("balance", updatedBalance);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  useEffect(() => {
    if (localStorage.getItem("balance")) {
      setBalance(localStorage.getItem("balance"));
    } else {
      localStorage.setItem("balance", 5000);
    }
    if (localStorage.getItem("expenses")) {
      setExpenses(JSON.parse(localStorage.getItem("expenses")));
    } else {
      localStorage.setItem("expenses", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    setBalance(localStorage.getItem("balance"));
  }, [balance]);

  return (
    <div className="min-h-screen bg-gray-800 text-white px-10 py-6">
      <h1 className="text-5xl font-bold mb-6">Expense Tracker</h1>

      <div className="bg-gray-700 p-6 rounded-xl mb-8">
        <div className="flex-wrap gap-6 w-full flex md:flex-row flex-col justify-around items-center">
          <WalletBalance balance={balance} onAddExpense={handleIncomeForm} />
          <ExpenseCard expenses={expenses} onAddExpense={handleExpenseForm} />
          <div className="bg-gray-600 rounded-xl p-6 w-full md:w-[300px] flex items-center justify-center text-white text-lg">
            <ExpensePieChart expenseList={expenses} />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
          <ExpenseList
            expenseList={expenses}
            handleExpenseForm={handleExpenseForm}
            handleDeleteExpense={handleDeleteExpense}
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Top Expenses</h2>
          <div className="bg-gray-700 rounded-xl p-6">
            <TopExpensesBarChart expenseList={expenses} />
          </div>
        </div>
      </div>

      <IncomeForm
        showIncomeForm={showIncomeForm}
        setShowIncomeForm={setShowIncomeForm}
        handleIncomeFormSubmit={handleIncomeFormSubmit}
      />
      <ExpenseForm
        type={expenseFormType}
        showExpenseForm={showExpenseForm}
        setShowExpenseForm={setShowExpenseForm}
        onClose={closeExpenseForm}
        expenseFormData={expenseFormData}
        setExpenseFormData={setExpenseFormData}
        handleExpenseSubmit={handleExpenseSubmit}
      />
    </div>
  );
}

export default App;
