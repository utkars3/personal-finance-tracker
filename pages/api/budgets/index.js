import { connectToDatabase } from "@/lib/mongodb";
import Budget from "@/models/Budget";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const budgets = await Budget.find().sort({ month: 1 });
      return res.status(200).json(budgets);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch budgets" });
    }
  }

  if (req.method === "POST") {
    try {
      const { month, amount } = req.body;
      if (!month || !amount) {
        return res.status(400).json({ error: "All fields are required" });
      }

      let budget = await Budget.findOne({ month });
      if (budget) {
        budget.amount = amount;
        await budget.save();
      } else {
        budget = new Budget({ month, amount });
        await budget.save();
      }

      return res.status(201).json({ message: "Budget saved", budget });
    } catch (error) {
      return res.status(500).json({ error: "Failed to save budget" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).json({ error: `Method ${req.method} not allowed` });
}
