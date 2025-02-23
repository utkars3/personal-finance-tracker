"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function TransactionForm({ onTransactionAdded }) {
  const { register, handleSubmit, reset, setValue } = useForm();

  const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];

  const onSubmit = async (data) => {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      reset();
      onTransactionAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register("amount", { required: true })} type="number" placeholder="Amount" />
      <Input {...register("date", { required: true })} type="date" />
      <Input {...register("description", { required: true })} placeholder="Description" />

      {/* ShadCN Select Component for Category */}
      <Select onValueChange={(value) => setValue("category", value)}>
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

      <Button type="submit">Add Transaction</Button>
    </form>
  );
}
