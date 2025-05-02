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

  if (method === "DELETE") {
    try {
      await Expense.findByIdAndDelete(id);
      return res.status(200).json({ message: "Expense deleted" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete expense" });
    }
  }

  res.setHeader("Allow", ["DELETE"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
