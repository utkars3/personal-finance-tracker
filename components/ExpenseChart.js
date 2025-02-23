"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFA", "#F765A3"];

export default function ExpenseChart() {
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((transactions) => {
        // Group by month
        const monthlyData = transactions.reduce((acc, tx) => {
          const month = new Date(tx.date).toLocaleString("default", { month: "short" });
          acc[month] = (acc[month] || 0) + tx.amount;
          return acc;
        }, {});

        // Group by category
        const categoryData = transactions.reduce((acc, tx) => {
          acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
          return acc;
        }, {});

        setBarData(
          Object.entries(monthlyData).map(([month, amount]) => ({ month, amount }))
        );

        setPieData(
          Object.entries(categoryData).map(([category, amount]) => ({ name: category, value: amount }))
        );
      });
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Bar Chart - Monthly Expenses */}
      <div className="bg-white p-4 shadow-md rounded-xl">
        <h2 className="text-lg font-semibold mb-2 text-center">Monthly Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart - Category-wise Expenses */}
      <div className="bg-white p-4 shadow-md rounded-xl">
        <h2 className="text-lg font-semibold mb-2 text-center">Category-wise Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
