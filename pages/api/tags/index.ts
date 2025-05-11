import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Tag from "@/models/Tag";
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
    // 🔹 Create new tag
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

      const { name, color } = body;
      if (!name || !color) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      try {
        const decoded = jwt.verify(token, secret) as AuthTokenPayload;
        const userId = decoded.userId;

        const newAccount = await Tag.create({
          userId,
          name,
          color,
        });
        return res.status(201).json(newAccount);
      } catch (error) {
        return res.status(500).json({ error: "Failed to create tag account" });
      }
    }

    // 🔹 Get Tags by userId from JWT
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

        const tags = await Tag.find({ userId });
        return res.status(200).json(tags);
      } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }
    }

    // 🔹 Delete Tag by ID
    case "DELETE": {
      const { tagId } = query;
      if (!tagId || typeof tagId !== "string") {
        return res
          .status(400)
          .json({ error: "Missing or invalid bankId in query" });
      }
      try {
        await Tag.findByIdAndDelete(tagId);
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
