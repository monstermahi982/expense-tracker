import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface IExpense extends Document {
  userId: Types.ObjectId;
  bankAccountId: Types.ObjectId;
  title: string;
  amount: number;
  date: Date;
  month: number;
  year: number;
  tag: Types.ObjectId,
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bankAccountId: {
      type: Schema.Types.ObjectId,
      ref: "BankAccount",
      required: true,
    },
    tag: {
      type: Schema.Types.ObjectId,
      ref: "Tag",
      required: false,
    },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

// ✅ Fix: use `models` to avoid re-defining the model during hot reload
export const Expense =
  models.Expense || model<IExpense>("Expense", ExpenseSchema);
