import { create } from "zustand";
import { addExpense, getExpenseList, Expense } from "@/server/expense";

interface ExpenseStore {
  expenses: { expenses: Expense[]; total: number };
  isLoading: boolean;
  error: string | null;
  addExpense: (data: Expense[]) => Promise<void>;
  getExpenses: (filters: {
    month: number;
    year: number;
    bankId?: string | null;
  }) => Promise<void>;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  isLoading: false,
  error: null,

  addExpense: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await addExpense(data);
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Expense add failed" });
    } finally {
      set({ isLoading: false });
    }
  },

  getExpenses: async (filters) => {
    set({ isLoading: true });
    try {
      const result = await getExpenseList(filters);
      set({ expenses: result });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to load expenses" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
