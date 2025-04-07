import React, { useState } from "react";
import "./WalletBalance.css";

function WalletBalance({ balance, onAddBalance }) {
  const [income, setIncome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = Number(income);
    if (!amount || amount <= 0) return;
    onAddBalance(amount);
    setIncome("");
  };

  return (
    <div className="wallet-container">
      <h2>Wallet Balance: ${balance.toFixed(2)}</h2>
      <form className="income-form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Income Amount"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
        <button type="submit">Add Balance</button>
      </form>
    </div>
  );
}

export default WalletBalance;
