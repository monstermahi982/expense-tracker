import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import { Expense } from "@/models/Expense";
import mongoose, { Types } from "mongoose";

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

      if (!Array.isArray(expenses) || expenses.length === 0) {
        return res
          .status(400)
          .json({ error: "expenses must be a non-empty array" });
      }

      const isValid = expenses.every(
        (exp) =>
          exp.userId &&
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
        const result = await Expense.insertMany(expenses);
        return res
          .status(201)
          .json({ message: "Expenses added successfully", data: result });
      } catch (error) {
        return res.status(500).json({ error: "Failed to insert expenses" });
      }
    }

    case "GET": {
      const { userId, month, year } = query;

      if (!userId || !month || !year) {
        return res
          .status(400)
          .json({ error: "Missing userId, month, or year in query" });
      }

      try {
        const expenses = await Expense.aggregate([
          {
            $match: {
              userId: new Types.ObjectId(userId as string),
              month: parseInt(month as string),
              year: parseInt(year as string),
            },
          },
          {
            $group: {
              _id: "$bankAccountId",
              total: { $sum: "$amount" },
              expenses: { $push: "$$ROOT" },
            },
          },
          {
            $lookup: {
              from: "bankaccounts",
              localField: "_id",
              foreignField: "_id",
              as: "bank",
            },
          },
          {
            $unwind: "$bank",
          },
          {
            $project: {
              bankName: "$bank.name",
              bankAccountId: "$_id",
              total: 1,
              expenses: 1,
            },
          },
          // Add this stage to calculate the overall total of all banks
          {
            $group: {
              _id: null,
              banks: { $push: "$$ROOT" },
              overallTotal: { $sum: "$total" },
            },
          },
          {
            $project: {
              banks: 1,
              overallTotal: 1,
            },
          },
        ]);

        return res.status(200).json({ data: expenses });
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
