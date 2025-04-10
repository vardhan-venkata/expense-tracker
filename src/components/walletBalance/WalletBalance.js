import React from "react";

function WalletBalance({ balance, onAddExpense }) {
  return (
    <div className="flex-1 bg-gray-400 h-[200px] p-5 rounded-lg flex flex-col justify-center items-center gap-5 min-w-[250px]">
      <p className="text-2xl font-bold">
        Wallet Balance:{" "}
        <span className=" text-green-400">
          {" "}
          $ {parseFloat(balance).toFixed(2)}
        </span>
      </p>
      <button
        type="button"
        className="bg-green-500 hover:bg-green-400 hover:cursor-pointer text-white p-2 rounded"
        onClick={onAddExpense}
      >
        + Add Income
      </button>
    </div>
  );
}

export default WalletBalance;
