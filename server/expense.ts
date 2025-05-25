import axios from "@/lib/axios";

export interface Expense {
  title: string;
  amount: number;
  date: string; // ISO format
  userId: string;
  bankAccountId: string;
  month: number;
  year: number;
}

export interface TagExpense {
  tag: string;
}

export const addExpense = async (data: Expense[]): Promise<void> => {
  await axios.post("/expenses", { expenses: data });
};

export const addExpenseTag = async (
  id: string,
  data: TagExpense
): Promise<void> => {
  await axios.patch("/expenses/tag/" + id, { ...data });
};

export const getExpenseList = async (filters: {
  month: number;
  year: number;
  bankId?: string;
  tag?: string;
}): Promise<Expense[]> => {
  const { month, year, bankId, tag } = filters;
  const params = new URLSearchParams({
    month: month.toString(),
    year: year.toString(),
  });
  if (bankId) params.append("bankId", bankId);
  if (tag) params.append("tag", tag);
  const res = await axios.get(`/expenses?${params.toString()}`);
  return res.data;
};
