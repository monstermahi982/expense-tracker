import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Tag from "@/models/Tag";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  switch (req.method) {
    case "GET":
      const {
        query: { id },
        method,
      } = req;

      if (method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
      }

      try {
        const tag = await Tag.findById(id);
        if (!tag) return res.status(404).json({ error: "Tag not found" });

        return res.status(200).json(tag);
      } catch (error) {
        return res.status(500).json({ error: "Failed to get tag account" });
      }

    case "PUT":
      const updated = await Tag.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(updated);
  }
}
