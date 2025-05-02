import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import { BankAccount } from "@/models/BankAccount";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { method, query, body } = req;

  switch (method) {
    // 🔹 Create Bank Account
    case "POST": {
      const { userId, name, accountNumber = 1 } = body;
      if (!userId || !name || !accountNumber) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      try {
        const newAccount = await BankAccount.create({
          userId,
          name,
          accountNumber,
        });
        return res.status(201).json(newAccount);
      } catch (error) {
        return res.status(500).json({ error: "Failed to create bank account" });
      }
    }

    // 🔹 Get Banks by userId
    case "GET": {
      const { userId } = query;
      if (!userId) {
        return res.status(400).json({ error: "Missing userId in query" });
      }
      try {
        const accounts = await BankAccount.find({ userId });
        return res.status(200).json(accounts);
      } catch (error) {
        return res.status(500).json({ error: "Failed to fetch bank accounts" });
      }
    }

    // 🔹 Delete Bank by ID
    case "DELETE": {
      const { bankId } = query;
      if (!bankId) {
        return res.status(400).json({ error: "Missing bankId in query" });
      }
      try {
        await BankAccount.findByIdAndDelete(bankId);
        return res.status(200).json({ message: "Bank account deleted" });
      } catch (error) {
        return res.status(500).json({ error: "Failed to delete bank account" });
      }
    }

    default:
      res.setHeader("Allow", ["POST", "GET", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
