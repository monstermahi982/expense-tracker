import { create } from "zustand";
import {
  addExpense,
  getExpenseList,
  Expense,
  addExpenseTag,
  TagExpense,
} from "@/server/expense";

interface ExpenseStore {
  expenses: { expenses: Expense[]; total: number };
  isLoading: boolean;
  error: string | null;
  addExpense: (data: Expense[]) => Promise<void>;
  addExpenseTag: (id: string, data: TagExpense) => Promise<void>;
  getExpenses: (filters: {
    month: number;
    year: number;
    bankId?: string | null;
    tag?: string | null;
  }) => Promise<void>;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  isLoading: false,
  error: null,

  addExpense: async (data: Expense[]) => {
    set({ isLoading: true, error: null });
    try {
      await addExpense(data);
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Expense add failed" });
    } finally {
      set({ isLoading: false });
    }
  },

  addExpenseTag: async (id: string, data: TagExpense) => {
    set({ isLoading: true, error: null });
    try {
      await addExpenseTag(id, data);
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Expense add failed" });
    } finally {
      set({ isLoading: false });
    }
  },

  getExpenses: async (filters: any) => {
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
