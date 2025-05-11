import { addTag, deleteTag, getTagList, Tag, updateTag } from "@/server/tag";
import { create } from "zustand";

interface AuthState {
  tagList: any;
  isLoading: boolean;
  error: string | null;
  addTag: (data: Tag) => Promise<void>;
  updateTag: (id: string, data: Tag) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
  getTags: () => Promise<void>;
}

export const useTagStore = create<AuthState>((set) => ({
  tagList: [],
  isLoading: false,
  error: null,

  addTag: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const bank = await addTag(data);
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Tag Create failed" });
    } finally {
      set({ isLoading: false });
    }
  },

  updateTag: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const bank = await updateTag(id, data);
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Tag Update failed" });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTag: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const bank = await deleteTag(id);
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Tag Delete failed" });
    } finally {
      set({ isLoading: false });
    }
  },

  getTags: async () => {
    set({ isLoading: true });
    try {
      const banks = await getTagList();
      set({ tagList: banks });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to load tags" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
