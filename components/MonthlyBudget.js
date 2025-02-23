"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MONTHS_ORDER = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function MonthlyBudget() {
  const [monthlyBudgets, setMonthlyBudgets] = useState({});
  const [budgetInput, setBudgetInput] = useState({ month: "", amount: "" });
  const [budgetChartData, setBudgetChartData] = useState([]);

  useEffect(() => {
    fetchBudgetData();
    fetchTransactionData();
  }, []);

  // Fetch budgets from database
  const fetchBudgetData = async () => {
    try {
      const res = await fetch("/api/budgets");
      const data = await res.json();
      const budgets = data.reduce((acc, { month, amount }) => {
        acc[month] = amount;
        return acc;
      }, {});
      setMonthlyBudgets(budgets);
      updateChartData(budgets, null); // Update chart with budgets
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  // Fetch transactions from database
  const fetchTransactionData = async () => {
    try {
      const res = await fetch("/api/transactions");
      const transactions = await res.json();
      const monthlySpending = transactions.reduce((acc, tx) => {
        const month = new Date(tx.date).toLocaleString("default", { month: "short" });
        acc[month] = (acc[month] || 0) + tx.amount;
        return acc;
      }, {});
      updateChartData(null, monthlySpending); // Update chart with spending
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Update the bar chart data
  const updateChartData = (updatedBudgets, updatedSpending) => {
    setBudgetChartData((prevData) => {
      const budgets = updatedBudgets || monthlyBudgets;
      const spending = updatedSpending || prevData.reduce((acc, d) => ({ ...acc, [d.month]: d.spent }), {});

      return MONTHS_ORDER.map((month) => ({
        month,
        budget: budgets[month] || 0,
        spent: spending[month] || 0,
      }));
    });
  };

  // Add budget to database
  const handleAddBudget = async () => {
    if (!budgetInput.month || !budgetInput.amount) return;

    try {
      await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month: budgetInput.month, amount: Number(budgetInput.amount) }),
      });

      const updatedBudgets = { ...monthlyBudgets, [budgetInput.month]: Number(budgetInput.amount) };
      setMonthlyBudgets(updatedBudgets);
      updateChartData(updatedBudgets, null);
      setBudgetInput({ month: "", amount: "" });
    } catch (error) {
      console.error("Error adding budget:", error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Add Budget */}
      <Card>
        <CardHeader>
          <CardTitle>Set Monthly Budget</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-4 items-center">
          <Select onValueChange={(value) => setBudgetInput({ ...budgetInput, month: value })}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              {MONTHS_ORDER.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Amount"
            value={budgetInput.amount}
            onChange={(e) => setBudgetInput({ ...budgetInput, amount: e.target.value })}
          />
          <Button onClick={handleAddBudget}>Add</Button>
        </CardContent>
      </Card>

      {/* Budget Table */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Budgets</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Month</th>
                <th className="border p-2">Budget</th>
              </tr>
            </thead>
            <tbody>
              {MONTHS_ORDER.map((month) => (
                <tr key={month}>
                  <td className="border p-2">{month}</td>
                  <td className="border p-2">${monthlyBudgets[month] || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Budget vs. Spend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Budget vs. Total Spend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetChartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="spent" fill="#FF8042" name="Spent" />
              <Bar dataKey="budget" fill="#0088FE" name="Budget" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
