import axios from "@/lib/axios";

export interface Tag {
  _id?: string;
  name: string;
  color: string;
  userId?: string;
  tagType?: string;
}

export const addTag = async (data: Tag): Promise<Tag> => {
  const res = await axios.post("/tags", data);
  return res.data;
};

export const updateTag = async (id: string, data: Tag): Promise<Tag> => {
  const res = await axios.put("/tags/" + id, data);
  return res.data;
};

export const deleteTag = async (id: string): Promise<Tag> => {
  const res = await axios.delete("/tags/" + id);
  return res.data;
};

export const getTagList = async (): Promise<Tag> => {
  const res = await axios.get("/tags");
  return res.data;
};
