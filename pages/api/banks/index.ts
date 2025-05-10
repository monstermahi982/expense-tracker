import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import { BankAccount } from "@/models/BankAccount";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthTokenPayload extends JwtPayload {
  userId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { method, query, body } = req;

  switch (method) {
    // 🔹 Create Bank Account
    case "POST": {

      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ error: "Missing or invalid Authorization header" });
      }
 
      const token = authHeader.split(" ")[1];
      const secret = process.env.JWT_SECRET || "monster123";

      if (!secret) {
        return res.status(500).json({ error: "JWT secret is not configured" });
      }

      const { name, accountNumber = 1 } = body;
      if (!name || !accountNumber) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      try {

        const decoded = jwt.verify(token, secret) as AuthTokenPayload;
        const userId = decoded.userId;

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

    // 🔹 Get Banks by userId from JWT
    case "GET": {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ error: "Missing or invalid Authorization header" });
      }
 
      const token = authHeader.split(" ")[1];
      const secret = process.env.JWT_SECRET || "monster123";

      if (!secret) {
        return res.status(500).json({ error: "JWT secret is not configured" });
      }

      try {
        const decoded = jwt.verify(token, secret) as AuthTokenPayload;
        
        const userId = decoded.userId;

        if (!userId) {
          return res
            .status(400)
            .json({ error: "Invalid token payload: missing userId" });
        }

        const accounts = await BankAccount.find({ userId });
        return res.status(200).json(accounts);
      } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }
    }

    // 🔹 Delete Bank by ID
    case "DELETE": {
      const { bankId } = query;
      if (!bankId || typeof bankId !== "string") {
        return res
          .status(400)
          .json({ error: "Missing or invalid bankId in query" });
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
