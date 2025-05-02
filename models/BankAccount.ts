import { Schema, model, Document, Types } from "mongoose";

export interface IBankAccount extends Document {
  userId: Types.ObjectId;
  name: string;
  accountNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

const BankAccountSchema = new Schema<IBankAccount>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    accountNumber: { type: String, required: false },
  },
  { timestamps: true }
);

export const BankAccount = model<IBankAccount>(
  "BankAccount",
  BankAccountSchema
);
