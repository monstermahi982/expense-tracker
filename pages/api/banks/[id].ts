import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import { BankAccount } from "@/models/BankAccount";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const {
    query: { id },
    method,
  } = req;

  if (method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    const bank = await BankAccount.findById(id);
    if (!bank) return res.status(404).json({ error: "Bank not found" });

    return res.status(200).json(bank);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get bank account" });
  }
}
