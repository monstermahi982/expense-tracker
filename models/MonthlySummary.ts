import { Schema, model, Document, Types } from "mongoose";

interface TotalsByBank {
  bankAccountId: Types.ObjectId;
  total: number;
}

export interface IMonthlySummary extends Document {
  userId: Types.ObjectId;
  year: number;
  month: number;
  totalsByBank: TotalsByBank[];
  overallTotal: number;
  createdAt: Date;
  updatedAt: Date;
}

const MonthlySummarySchema = new Schema<IMonthlySummary>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    totalsByBank: [
      {
        bankAccountId: {
          type: Schema.Types.ObjectId,
          ref: "BankAccount",
          required: true,
        },
        total: { type: Number, required: true },
      },
    ],
    overallTotal: { type: Number, required: true },
  },
  { timestamps: true }
);

export const MonthlySummary = model<IMonthlySummary>(
  "MonthlySummary",
  MonthlySummarySchema
);
