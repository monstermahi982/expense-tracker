import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type LoginRequestBody = {
  email: string;
  password: string;
};

type LoginResponse =
  | { message: string; token: string; data: { name: string; email: string } }
  | { error: string }
  | { error: string; err: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password }: LoginRequestBody = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || ("monster123" as string)
    );

    return res
      .status(200)
      .json({
        message: "Login successful",
        token,
        data: { name: user.name, email: user.email },
      });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error", err });
  }
}
