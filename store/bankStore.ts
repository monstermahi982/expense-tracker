import { create } from "zustand";
import { addBank, Bank, getBankList } from "@/server/bank";

interface AuthState {
  bankList: any;
  isLoading: boolean;
  error: string | null;
  addBank: (data: Bank) => Promise<void>;
  getBanks: () => Promise<void>;
}

export const useBankStore = create<AuthState>((set) => ({
  bankList: [],
  isLoading: false,
  error: null,

  addBank: async (data: Bank): Promise<any> => {
    set({ isLoading: true, error: null });
    try {
      return addBank(data);
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Bank Create failed" });
    } finally {
      set({ isLoading: false });
    }
  },

  getBanks: async () => {
    set({ isLoading: true });
    try {
      const banks = await getBankList();
      set({ bankList: banks });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to load users" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
