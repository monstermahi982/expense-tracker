export interface Expense {
    id?: string;
    _id: string;
    title: string;
    amount: number;
    date: string;
    tag: string
    bankName?: string;
    month?: string;
    year?: string;
  }
  