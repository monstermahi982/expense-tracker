"use client";

import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Building, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { useBankStore } from "@/store/bankStore";
import { Bank } from "@/server/bank";
import { useExpenseStore } from "@/store/expenseStore";

interface ExpenseEntry {
  title: string;
  amount: string;
}

export default function AddExpensePage() {
  const router = useRouter();
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<ExpenseEntry[]>([
    { title: "", amount: "" },
  ]);

  const expenseStore = useExpenseStore();

  const bankStore = useBankStore();
  const [bankList, setBankList] = useState<Bank[]>([]);

  const getBanksData = async () => {
    await bankStore.getBanks();
    setBankList(useBankStore.getState().bankList);
  };

  const hasFetched = useRef(false);
  useEffect(() => {
    if (!hasFetched.current) {
      getBanksData();
      hasFetched.current = true;
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const currentExpense = expenses[index];
      if (currentExpense.amount) {
        const newExpense = {
          title: "",
          amount: "",
        };
        setExpenses([...expenses, newExpense]);
        setTimeout(() => {
          const newAmountInput = document.getElementById(
            `amount-${expenses.length}`
          );
          newAmountInput?.focus();
        }, 0);
      }
    }
  };

  const handleRemoveExpense = (index: number) => {
    if (expenses.length > 1) {
      setExpenses(expenses.filter((_, i) => i !== index));
    }
  };

  const handleExpenseChange = (
    index: number,
    field: keyof ExpenseEntry,
    value: string
  ) => {
    const newExpenses = [...expenses];
    if (field === "amount" && !newExpenses[index].title) {
      newExpenses[index].title = `Expense ${index + 1}`;
    }
    newExpenses[index] = { ...newExpenses[index], [field]: value };
    setExpenses(newExpenses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBank || !selectedMonth || !selectedYear) {
      toast.error("Please select a bank, month, and year");
      return;
    }

    const validExpenses = expenses.filter((expense) => expense.amount);
    if (validExpenses.length === 0) {
      toast.error("Please add at least one expense amount");
      return;
    }

    const payload = validExpenses.map((item: any) => {
      return {
        ...item,
        bankAccountId: selectedBank,
        date: new Date().toISOString(),
        month: selectedMonth,
        year: selectedYear,
      };
    });

    await expenseStore.addExpense(payload);

    toast.success(
      `${validExpenses.length} expenses added for ${selectedMonth}/${selectedYear}`
    );
    router.push("/expenses");
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">
              Quick Add Expenses
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="neopop-card">
              <CardHeader>
                <CardTitle>Select Bank Account</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={(value) => setSelectedBank(value)}>
                  <SelectTrigger className="w-full neopop-select">
                    <SelectValue placeholder="Select a bank account" />
                  </SelectTrigger>
                  <SelectContent>
                    {bankList.map((account: Bank, index: number) => (
                      <SelectItem key={index} value={account._id}>
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                            <Building className="h-3 w-3" />
                          </div>
                          <span>{account.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Month and Year Select */}
            <Card className="neopop-card">
              <CardHeader>
                <CardTitle>Select Month & Year</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Select onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-full neopop-select">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full neopop-select">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="neopop-card">
              <CardHeader>
                <CardTitle>Enter Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenses.map((expense, index) => (
                    <div
                      key={index}
                      className="relative flex gap-4 items-end animate-in fade-in slide-in-from-left-5 duration-300"
                    >
                      <div className="w-[200px]">
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id={`amount-${index}`}
                            type="number"
                            step="0.01"
                            value={expense.amount}
                            onChange={(e) =>
                              handleExpenseChange(
                                index,
                                "amount",
                                e.target.value
                              )
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="pl-7 neopop-input"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <Input
                          value={expense.title}
                          onChange={(e) =>
                            handleExpenseChange(index, "title", e.target.value)
                          }
                          className="neopop-input"
                          placeholder={`Expense ${index + 1}`}
                        />
                      </div>
                      {expenses.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveExpense(index)}
                          className="h-10 w-10 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 text-red-400 cursor-pointer" />
                          <span className="sr-only">Remove expense</span>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="neopop-btn"
              >
                Cancel
              </Button>
              <Button type="submit" className="neopop-btn">
                Save Expenses
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
