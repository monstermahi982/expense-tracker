import axios from "@/lib/axios"; // your custom axios instance

export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export const loginUser = async (data: LoginInput): Promise<User> => {
  const res = await axios.post("/users/login", data);
  return res.data;
};

export const registerUser = async (data: RegisterInput): Promise<User> => {
  const res = await axios.post("/users/register", data);
  return res.data;
};

export const fetchUsers = async (): Promise<User[]> => {
  const res = await axios.get("/users");
  return res.data;
};
