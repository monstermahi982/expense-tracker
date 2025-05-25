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
    case "GET": {
      const { type } = query;

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

      if (!type) {
        return res.status(400).json({ error: "Missing type in query" });
      }

      try {
        const decoded = jwt.verify(token, secret) as AuthTokenPayload;
        const userId = decoded.userId;

        const match: any = {
          userId: new Types.ObjectId(userId as string),
        };

        let expenses = [];

        if (type === "monthly") {
          expenses = await Expense.aggregate([
            {
              $match: match,
            },
            {
              $group: {
                _id: {
                  month: "$month",
                  year: "$year",
                },
                totalAmount: { $sum: "$amount" },
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                month: "$_id.month",
                year: "$_id.year",
                count: 1,
                totalAmount: 1,
              },
            },
            {
              $sort: {
                year: 1,
                month: 1,
              },
            },
          ]);
        } else if (type === "yearly") {
          expenses = await Expense.aggregate([
            {
              $match: match,
            },
            {
              $group: {
                _id: {
                  year: "$year",
                },
                totalAmount: { $sum: "$amount" },
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                year: "$_id.year",
                count: 1,
                totalAmount: 1,
              },
            },
            {
              $sort: {
                year: 1,
              },
            },
          ]);
        } else if (type === "quarterly") {
          expenses = await Expense.aggregate([
            {
              $match: match,
            },
            {
              $addFields: {
                quarter: {
                  $ceil: { $divide: ["$month", 3] },
                },
              },
            },
            {
              $group: {
                _id: {
                  year: "$year",
                  quarter: "$quarter",
                },
                totalAmount: { $sum: "$amount" },
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                year: "$_id.year",
                quarter: {
                  $switch: {
                    branches: [
                      {
                        case: { $eq: ["$_id.quarter", 1] },
                        then: {
                          $concat: [
                            "January ",
                            { $toString: "$_id.year" },
                            " - March ",
                            { $toString: "$_id.year" },
                          ],
                        },
                      },
                      {
                        case: { $eq: ["$_id.quarter", 2] },
                        then: {
                          $concat: [
                            "April ",
                            { $toString: "$_id.year" },
                            " - June ",
                            { $toString: "$_id.year" },
                          ],
                        },
                      },
                      {
                        case: { $eq: ["$_id.quarter", 3] },
                        then: {
                          $concat: [
                            "July ",
                            { $toString: "$_id.year" },
                            " - September ",
                            { $toString: "$_id.year" },
                          ],
                        },
                      },
                      {
                        case: { $eq: ["$_id.quarter", 4] },
                        then: {
                          $concat: [
                            "October ",
                            { $toString: "$_id.year" },
                            " - December ",
                            { $toString: "$_id.year" },
                          ],
                        },
                      },
                    ],
                    default: "Unknown Quarter",
                  },
                },
                totalAmount: 1,
                count: 1,
              },
            },
            {
              $sort: {
                year: 1,
                quarter: 1,
              },
            },
          ]);
        } else {
          return res.status(400).json({ error: "Invalid type in query" });
        }

        return res.status(200).json(expenses || []);
      } catch (error) {
        console.error("Error getting expenses:", error);
        return res.status(500).json({ error: "Failed to get user expenses" });
      }
    }
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
