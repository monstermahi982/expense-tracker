import axios from "@/lib/axios";

export interface Bank {
  id: string;
  name: string;
  accountNumber?: string
}

export const addBank = async (data: Bank): Promise<Bank> => {
  const res = await axios.post("/banks", data);
  return res.data;
};

export const getBankList = async (): Promise<Bank> => {
  const res = await axios.get("/banks");
  return res.data;
};
