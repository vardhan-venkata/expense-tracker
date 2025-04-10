import { useEffect, useState } from "react";
import "./App.css";
import ExpenseCard from "./components/expenses/ExpenseCard";
import WalletBalance from "./components/walletBalance/WalletBalance";
import ReactModal from "react-modal";
import ExpenseForm from "./components/expenses/ExpenseForm";
import ExpenseList from "./components/expenses/ExpenseList";
import ExpensePieChart from "./components/expenses/ExpensePieChart";
import TopExpensesBarChart from "./components/expenses/TopExpensesBarChart";

function App() {
  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [expenseList, setExpenseList] = useState([]);
  const [expenseFormType, setExpenseFormType] = useState("Add");
  const [expenseFormData, setExpenseFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  const handleExpenseForm = (action = "Add", expense) => {
    console.log("action", action, expense);
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
    const updatedBalance = parseInt(balance) + parseInt(income);
    setBalance(updatedBalance);
    localStorage.setItem("balance", updatedBalance);
    localStorage.removeItem("incomeValue");
    setShowIncomeForm(false);
  };

  const handleExpenseSubmit = (expense) => {
    const parsedPrice = parseInt(expense.price);
    console.log("parsePrice", parsedPrice);

    // For editing, subtract old price and add new one to update balance and expense total correctly
    if (expenseFormType === "Edit") {
      const indexToEdit = expenseList.findIndex(
        (e) => e.key === expenseFormData.key
      );
      if (indexToEdit === -1) return;

      const oldExpense = expenseList[indexToEdit];
      const priceDifference = parsedPrice - parseInt(oldExpense.price);
      const updatedBalance = balance - priceDifference;
      const updatedExpenses = parseInt(expenses) + priceDifference;

      if (updatedBalance < 0) {
        alert("Insufficient balance");
        return;
      }

      const updatedExpense = { ...expense, key: oldExpense.key };
      const updatedList = [...expenseList];
      updatedList[indexToEdit] = updatedExpense;

      setBalance(updatedBalance);
      setExpenses(updatedExpenses);
      setExpenseList(updatedList);
      localStorage.setItem("balance", updatedBalance);
      localStorage.setItem("expenses", updatedExpenses);
      localStorage.setItem("expenseList", JSON.stringify(updatedList));
      setShowExpenseForm(false);
      return;
    }

    // Add flow
    const remainingBalance = balance - parsedPrice;
    const currentExpenses = parseInt(expenses) + parsedPrice;

    if (remainingBalance < 0) {
      alert("Insufficient balance");
      return;
    }

    const expenseWithKey = { ...expense, key: expenseList.length + 1 };
    const updatedList = [...expenseList, expenseWithKey];

    setBalance(remainingBalance);
    setExpenses(currentExpenses);
    setExpenseList(updatedList);
    localStorage.setItem("balance", remainingBalance);
    localStorage.setItem("expenses", currentExpenses);
    localStorage.setItem("expenseList", JSON.stringify(updatedList));
    setShowExpenseForm(false);
  };
  const handleDeleteExpense = (indexToDelete) => {
    const deletedExpense = expenseList[indexToDelete];
    const updatedList = expenseList.filter(
      (_, index) => index !== indexToDelete
    );

    // Update balance and expenses
    const updatedBalance = parseInt(balance) + parseInt(deletedExpense.price);
    const updatedExpenses = parseInt(expenses) - parseInt(deletedExpense.price);

    setBalance(updatedBalance);
    setExpenses(updatedExpenses);
    setExpenseList(updatedList);

    // Update localStorage
    localStorage.setItem("balance", updatedBalance);
    localStorage.setItem("expenses", updatedExpenses);
    localStorage.setItem("expenseList", JSON.stringify(updatedList));
  };

  useEffect(() => {
    if (localStorage.getItem("balance")) {
      setBalance(localStorage.getItem("balance"));
    } else {
      localStorage.setItem("balance", 5000);
    }
    if (localStorage.getItem("expenses")) {
      setExpenses(localStorage.getItem("expenses"));
      console.log(localStorage.getItem("expenses"));
    } else {
      localStorage.setItem("expenses", 0);
    }
    if (localStorage.getItem("expenseList")) {
      setExpenseList(JSON.parse(localStorage.getItem("expenseList")));
    } else {
      localStorage.setItem("expenseList", JSON.stringify([]));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 text-white px-10 py-6">
      <h1 className="text-5xl font-bold mb-6">Expense Tracker</h1>

      <div className="bg-gray-700 p-6 rounded-xl mb-8">
        <div className="flex-wrap gap-6 w-full flex md:flex-row flex-col justify-around items-center">
          <WalletBalance balance={balance} onAddExpense={handleIncomeForm} />
          <ExpenseCard expenses={expenses} onAddExpense={handleExpenseForm} />
          <div className="bg-gray-600 rounded-xl p-6 w-full md:w-[300px] flex items-center justify-center text-white text-lg">
            <ExpensePieChart expenseList={expenseList} />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
          <ExpenseList
            expenseList={expenseList}
            handleExpenseForm={handleExpenseForm}
            handleDeleteExpense={handleDeleteExpense}
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Top Expenses</h2>
          <div className="bg-gray-700 rounded-xl p-6">
            <TopExpensesBarChart expenseList={expenseList} />
          </div>
        </div>
      </div>

      <ReactModal
        isOpen={showIncomeForm}
        onRequestClose={() => setShowIncomeForm(false)}
        className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-xl w-[500px] mx-auto outline-none"
        overlayClassName="fixed inset-0 bg-gray-200 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50"
      >
        <div className="text-black w-full">
          <h2 className="text-xl font-bold mb-4 text-center">Add Balance</h2>
          <div className="flex flex-col gap-4">
            <input
              type="number"
              placeholder="Income Amount"
              className="border border-gray-300 rounded-md px-4 py-2 shadow-sm"
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val)) {
                  localStorage.setItem("incomeValue", val);
                }
              }}
            />
            <div className="flex justify-between gap-4">
              <button
                type="submit"
                onClick={() => {
                  const val = parseInt(localStorage.getItem("incomeValue"));
                  if (!isNaN(val)) handleIncomeFormSubmit(val);
                }}
                className="bg-yellow-400 text-white px-4 py-2 rounded-md shadow w-full"
              >
                Add Balance
              </button>
              <button
                onClick={() => setShowIncomeForm(false)}
                className="bg-gray-200 text-black px-4 py-2 rounded-md shadow w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </ReactModal>

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
