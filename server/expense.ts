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

export const addExpense = async (data: Expense[]): Promise<void> => {
  await axios.post("/expenses", { expenses: data });
};

export const getExpenseList = async (filters: {
  month: number;
  year: number;
  bankId?: string;
}): Promise<Expense[]> => {
  const { month, year, bankId } = filters;
  const params = new URLSearchParams({
    month: month.toString(),
    year: year.toString(),
  });
  if (bankId) params.append("bankId", bankId);
  const res = await axios.get(`/expenses?${params.toString()}`);
  return res.data;
};
