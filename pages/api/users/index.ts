import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  switch (req.method) {
    case "GET":
      const users = await User.find({});
      return res.status(200).json(users);
    case "POST":
      const { name, email, phone, password } = req.body;
      const user = await User.create({ name, email, phone, password });
      return res.status(201).json(user);
    default:
      res.status(405).end();
  }
}
