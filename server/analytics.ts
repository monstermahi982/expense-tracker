import axios from "@/lib/axios";

export interface Analytics {
  totalAmount: number;
  month?: number;
  quarter?: string;
  year: number;
  count: number;
}

export const byDuration = async (type: string): Promise<Analytics[]> => {
  const params = new URLSearchParams({
    type,
  });
  const res = await axios.get(`/analytics?${params.toString()}`);
  return res.data;
};
