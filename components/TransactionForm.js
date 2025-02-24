"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function TransactionForm({ onTransactionAdded }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors, // Fix: To clear validation errors after reset
    watch,
    formState: { errors, isSubmitted },
  } = useForm();

  const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];

  const onSubmit = async (data) => {
    if (!data.category) return; // Prevent submission if category is missing

    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      reset();
      setSelectedCategory(""); // Reset category
      clearErrors(); // Fix: Clear all validation errors after reset
      setSuccessMessage("Transaction added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      onTransactionAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-4 shadow-md rounded-md">
      {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}

      <Input {...register("amount", { required: "Amount is required" })} type="number" placeholder="Amount" />
      {isSubmitted && errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}

      <Input {...register("date", { required: "Date is required" })} type="date" />
      {isSubmitted && errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

      <Input {...register("description", { required: "Description is required" })} placeholder="Description" />
      {isSubmitted && errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

      <Select
        onValueChange={(value) => {
          setValue("category", value);
          setSelectedCategory(value);
          clearErrors("category"); // Fix: Clear category validation error on selection
        }}
        value={selectedCategory}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isSubmitted && !watch("category") && <p className="text-red-500 text-sm">Category is required</p>}

      <Button type="submit" className="w-full">Add Transaction</Button>
    </form>
  );
}
