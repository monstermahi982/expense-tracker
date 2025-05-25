import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import { Expense } from "@/models/Expense";
import mongoose, { Types } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthTokenPayload extends JwtPayload {
  userId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { method, body, query } = req;

  switch (method) {
    // 🔹 Add Expense
    case "POST": {
      const { expenses } = body;

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

      if (!Array.isArray(expenses) || expenses.length === 0) {
        return res
          .status(400)
          .json({ error: "expenses must be a non-empty array" });
      }

      const isValid = expenses.every(
        (exp) =>
          exp.bankAccountId &&
          exp.title &&
          exp.amount &&
          exp.date &&
          exp.month &&
          exp.year
      );

      if (!isValid) {
        return res.status(400).json({
          error: "One or more expense items are missing required fields",
        });
      }

      try {
        const decoded = jwt.verify(token, secret) as AuthTokenPayload;
        const userId = decoded.userId;

        const updatedExpenses = expenses.map((exp) => ({
          ...exp,
          userId,
          tag: "6831f19229e4b40e92dc89ac",
        }));

        const result = await Expense.insertMany(updatedExpenses);
        return res
          .status(201)
          .json({ message: "Expenses added successfully", data: result });
      } catch (error) {
        return res.status(500).json({ error: "Failed to insert expenses" });
      }
    }

    case "GET": {
      const { month, year, bankId = undefined, tag = undefined } = query;

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

      if (!month || !year) {
        return res
          .status(400)
          .json({ error: "Missing userId, month, or year in query" });
      }

      try {
        const decoded = jwt.verify(token, secret) as AuthTokenPayload;
        const userId = decoded.userId;

        const match: any = {
          userId: new Types.ObjectId(userId as string),
          month: parseInt(month as string),
          year: parseInt(year as string),
        };

        if (bankId) {
          match.bankAccountId = new Types.ObjectId(bankId as string);
        }

        if (tag) {
          match.tag = new Types.ObjectId(tag as string);
        }

        const expenses = await Expense.aggregate([
          {
            $match: match,
          },
          {
            $lookup: {
              from: "bankaccounts",
              localField: "bankAccountId",
              foreignField: "_id",
              as: "bank",
            },
          },
          {
            $unwind: "$bank",
          },
          {
            $addFields: {
              bankName: "$bank.name",
            },
          },
          {
            $project: {
              bank: 0,
            },
          },
          {
            $group: {
              _id: null,
              expenses: { $push: "$$ROOT" },
              total: { $sum: "$amount" },
            },
          },
          {
            $project: {
              _id: 0,
              expenses: 1,
              total: 1,
            },
          },
        ]);
        return res.status(200).json(expenses.length > 0 ? expenses[0] : []);
      } catch (error) {
        console.error("Error getting expenses:", error);
        return res.status(500).json({ error: "Failed to get user expenses" });
      }
    }

    // 🔹 Get Expenses by bankAccountId + month/year with total
    // case "GET": {
    //   const { bankAccountId, month, year } = query;

    //   if (!bankAccountId || !month || !year) {
    //     return res
    //       .status(400)
    //       .json({ error: "Missing bankAccountId, month, or year" });
    //   }

    //   try {
    //     const expenses = await Expense.aggregate([
    //       {
    //         $match: {
    //           bankAccountId: new Types.ObjectId(bankAccountId as string),
    //           month: parseInt(month as string),
    //           year: parseInt(year as string),
    //         },
    //       },
    //       {
    //         $group: {
    //           _id: null,
    //           totalAmount: { $sum: "$amount" },
    //           expenses: { $push: "$$ROOT" },
    //         },
    //       },
    //     ]);

    //     if (expenses.length === 0) {
    //       return res.status(200).json({ total: 0, expenses: [] });
    //     }

    //     return res.status(200).json({
    //       total: expenses[0].totalAmount,
    //       expenses: expenses[0].expenses,
    //     });
    //   } catch (error) {
    //     return res.status(500).json({ error: "Failed to fetch expenses" });
    //   }
    // }

    default:
      res.setHeader("Allow", ["POST", "GET"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
