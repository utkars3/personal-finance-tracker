"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const categories = ["Food", "Transport", "Shopping", "Entertainment", "Bills", "Others"];

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then(setTransactions);
  }, []);

  // Delete Transaction
  const deleteTransaction = async (id) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    setTransactions((prev) => prev.filter((tx) => tx._id !== id));
  };

  // Handle Edit Mode Toggle
  const startEditing = (tx) => {
    setEditingId(tx._id);
    setEditData(tx);
  };

  // Handle Save Edit
  const saveEdit = async () => {
    await fetch(`/api/transactions/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    setTransactions((prev) =>
      prev.map((tx) => (tx._id === editingId ? editData : tx))
    );
    setEditingId(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions found.</p>
      ) : (
        transactions.map((tx) => (
          <Card key={tx._id} className="p-4 shadow-md w-full">
            {editingId === tx._id ? (
              <>
                <CardHeader>
                  <CardTitle className="text-lg">Edit Transaction</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <Input
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    placeholder="Description"
                  />
                  <Input
                    type="date"
                    value={editData.date.substring(0, 10)}
                    onChange={(e) =>
                      setEditData({ ...editData, date: e.target.value })
                    }
                  />
                  <Input
                    type="number"
                    value={editData.amount}
                    onChange={(e) =>
                      setEditData({ ...editData, amount: e.target.value })
                    }
                    placeholder="Amount"
                  />
                  {/* Category Dropdown */}
                  <Select
                    value={editData.category}
                    onValueChange={(value) => setEditData({ ...editData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
                <CardFooter className="flex justify-between gap-3 mt-2">
                  <Button onClick={saveEdit} className="bg-green-500 w-full">
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 w-full"
                  >
                    Cancel
                  </Button>
                </CardFooter>
              </>
            ) : (
              <>
                <CardHeader className="flex justify-between items-center">
                  <CardTitle className="text-lg">{tx.description}</CardTitle>
                  <p className="text-sm text-gray-500">
                    {tx.date.substring(0, 10)}
                  </p>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <p className="font-bold text-xl text-gray-800">${tx.amount}</p>
                  <p className="text-blue-600 font-medium">{tx.category}</p>
                </CardContent>
                <CardFooter className="flex justify-between gap-3 mt-2">
                  <Button
                    onClick={() => startEditing(tx)}
                    className="bg-yellow-500 w-full"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteTransaction(tx._id)}
                    className="bg-red-500 w-full"
                  >
                    Delete
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        ))
      )}
    </div>
  );
}
