import { connectToDatabase } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    const transactions = await Transaction.find().sort({ date: -1 });
    return res.status(200).json(transactions);
  }

  if (req.method === "POST") {
    try {
      const transaction = await Transaction.create(req.body);
      return res.status(201).json(transaction);
    } catch (error) {
      return res.status(400).json({ error: "Invalid data" });
    }
  }
}
