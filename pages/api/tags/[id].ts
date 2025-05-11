import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Tag from "@/models/Tag";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  const {
    query: { id },
    method,
  } = req;
  switch (req.method) {
    case "GET":
      if (method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
      }

      try {
        const tag = await Tag.findById(id);
        if (!tag) return res.status(404).json({ error: "Tag not found" });

        return res.status(200).json(tag);
      } catch (error) {
        return res.status(500).json({ error: "Failed to get tag" });
      }

    case "PUT":
      try {
        const updated = await Tag.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        return res.status(200).json(updated);
      } catch (er) {
        return res.status(500).json({ error: "Failed to update tag" });
      }

    case "DELETE":
      try {
        const deleteTag = await Tag.findByIdAndDelete(id);
        return res.status(200).json(deleteTag);
      } catch (er) {
        return res.status(500).json({ error: "Failed to delete tag" });
      }
  }
}
