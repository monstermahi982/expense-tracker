import { create } from "zustand";
import { Analytics, byDuration } from "@/server/analytics";

interface ExpenseStore {
  analytics: { analytics: Analytics[]; total: number };
  isLoading: boolean;
  error: string | null;
  byDuration: (type: string) => Promise<void>;
}

export const useAnalyticsStore = create<ExpenseStore>((set) => ({
  analytics: [],
  isLoading: false,
  error: null,

  byDuration: async (type: string) => {
    set({ isLoading: true });
    try {
      const result = await byDuration(type);
      set({ analytics: result });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to load analytics" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
