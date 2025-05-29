import { create } from "zustand";
import {
  loginUser,
  registerUser,
  fetchUsers,
  User,
  LoginInput,
  RegisterInput,
} from "@/server/user";

interface AuthState {
  currentUser: User | null;
  token: string | null;
  userList: User[];
  isLoading: boolean;
  error: string | null;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  getUsers: () => Promise<void>;
  logout: () => void;
  loadUserFromStorage: () => void;
}

export const useUserStore = create<AuthState>((set) => ({
  currentUser: null,
  token: null,
  userList: [],
  isLoading: false,
  error: null,

  login: async (data): Promise<any> => {
    set({ isLoading: true, error: null });
    try {
      const user: any = await loginUser(data);
      set({ currentUser: user.data, token: user.token || null });

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token || "");
      return user;
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Login failed" });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (data: RegisterInput): Promise<any> => {
    set({ isLoading: true, error: null });
    try {
      const user = await registerUser(data);
      set({ currentUser: user, token: user.token || null });

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token || "");

      return user;
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Registration failed" });
    } finally {
      set({ isLoading: false });
    }
  },

  getUsers: async () => {
    set({ isLoading: true });
    try {
      const users = await fetchUsers();
      set({ userList: users });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to load users" });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ currentUser: null, token: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  loadUserFromStorage: () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      if (storedUser && storedToken) {
        set({
          currentUser: JSON.parse(storedUser),
          token: storedToken,
        });
      }
    }
  },
}));
