import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import { Expense } from "@/models/Expense";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "DELETE":
      try {
        await Expense.findByIdAndDelete(id);
        return res.status(200).json({ message: "Expense deleted" });
      } catch (error) {
        return res.status(500).json({ error: "Failed to delete expense" });
      }

    case "UPDATE":
      try {
        await Expense.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({ message: "Expense updated" });
      } catch (error) {
        return res.status(500).json({ error: "Failed to update expense" });
      }
  }

  // res.setHeader("Allow", ["DELETE"]);
  // return res.status(405).end(`Method ${method} Not Allowed`);
}
