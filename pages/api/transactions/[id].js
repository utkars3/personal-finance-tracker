import { connectToDatabase } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export default async function handler(req, res) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const transaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(transaction);
    } catch (error) {
      return res.status(400).json({ error: "Invalid update request" });
    }
  }

  if (req.method === "DELETE") {
    await Transaction.findByIdAndDelete(id);
    return res.status(204).end();
  }
}
