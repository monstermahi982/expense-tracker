import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  await connectDB();

  switch (req.method) {
    case "GET":
      const user = await User.findById(id);
      return res.status(200).json(user);
    case "PUT":
      const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(updated);
    case "DELETE":
      await User.findByIdAndDelete(id);
      return res.status(204).end();
    default:
      res.status(405).end();
  }
}
