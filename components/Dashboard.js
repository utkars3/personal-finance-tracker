"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categoryExpenses, setCategoryExpenses] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((transactions) => {
        // Calculate total expenses
        const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
        setTotalExpenses(total);

        // Category-wise breakdown
        const categoryData = transactions.reduce((acc, tx) => {
          acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
          return acc;
        }, {});

        setCategoryExpenses(
          Object.entries(categoryData).map(([category, amount]) => ({ category, amount }))
        );

        // Most recent transactions (latest 5)
        setRecentTransactions([...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5));
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-5xl w-full space-y-6">
        {/* Grid Layout for Better Responsiveness */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Total Expenses */}
          <Card className="bg-white shadow-md rounded-xl p-6 w-full">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-700 text-center">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-3xl font-bold text-red-500">${totalExpenses.toFixed(2)}</p>
            </CardContent>
          </Card>

          {/* Category-wise Expenses */}
          <Card className="bg-white shadow-md rounded-xl p-6 w-full">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-700 text-center">Category-wise Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-3 text-left">Category</th>
                    <th className="border border-gray-300 p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryExpenses.map((item, index) => (
                    <tr key={index} className="border border-gray-300">
                      <td className="border border-gray-300 p-3">{item.category}</td>
                      <td className="border border-gray-300 p-3 text-right text-red-500 font-medium">
                        ${item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="bg-white shadow-md rounded-xl p-6 w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-700 text-center">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-gray-600 space-y-3">
              {recentTransactions.map((tx) => (
                <li key={tx._id} className="flex justify-between text-base border-b pb-2">
                  <span>{tx.description}</span>
                  <span className="font-medium text-red-500">${tx.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
