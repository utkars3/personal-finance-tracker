"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ExpenseChart from "@/components/ExpenseChart";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import Dashboard from "@/components/Dashboard";
import MonthlyBudget from "@/components/MonthlyBudget";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("form"); // Default tab is 'form'

  // Function to refresh transactions
  const handleTransactionAdded = async () => {
    const response = await fetch("/api/transactions");
    const data = await response.json();
    setTransactions(data);
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Personal Finance Visualizer
      </h1>

      {/* Navbar */}
      <Navbar setActiveTab={setActiveTab} />

      {/* Show Components Based on Active Tab */}
      {activeTab === "form" && <TransactionForm onTransactionAdded={handleTransactionAdded} />}
      {activeTab === "list" && <TransactionList transactions={transactions} />}
      {activeTab === "chart" && <ExpenseChart transactions={transactions} />}
      {activeTab === "dashboard" && <Dashboard transactions={transactions} />}
      {activeTab === "monthly budget" && <MonthlyBudget transactions={transactions} />}
    </main>
  );
}
