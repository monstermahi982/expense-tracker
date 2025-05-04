"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  MoreVertical,
  PenSquare,
  Trash2,
  ShoppingBag,
  Utensils,
  Home,
  Car,
  HeartPulse,
  Briefcase,
  Plane,
  PartyPopper,
  Building,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { expenses, bankAccounts } from "@/lib/data";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

const categoryIcons: Record<string, any> = {
  shopping: ShoppingBag,
  food: Utensils,
  housing: Home,
  transportation: Car,
  health: HeartPulse,
  work: Briefcase,
  travel: Plane,
  entertainment: PartyPopper,
};

const Expenses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBank = selectedBank
      ? expense.accountId === selectedBank
      : true;

    const matchesMonth = selectedMonth
      ? new Date(expense.date).getMonth() + 1 === Number(selectedMonth)
      : true;

    const matchesYear = selectedYear
      ? new Date(expense.date).getFullYear().toString() === selectedYear
      : true;

    return matchesSearch && matchesBank && matchesMonth && matchesYear;
  });

  const totalAmount = filteredExpenses.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const getCategoryIcon = (category: string) => {
    const Icon = categoryIcons[category.toLowerCase()] || ShoppingBag;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <DashboardLayout>
      <Card className="neopop-card mx-5 md:mx-20 my-5">
        <CardHeader className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <CardTitle className="text-xl font-bold">Recent Expenses</CardTitle>
            <CardDescription>
              Your latest transactions across all accounts
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Select onValueChange={(value) => setSelectedBank(value)}>
              <SelectTrigger className="w-[200px] neopop-select">
                <SelectValue placeholder="Select Bank" />
              </SelectTrigger>
              <SelectContent>
                {bankAccounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <Building className="h-3 w-3" />
                      </div>
                      <span>
                        {account.name} • {account.institution}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setSelectedMonth(value)}>
              <SelectTrigger className="w-[120px] neopop-select">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(12)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setSelectedYear(value)}>
              <SelectTrigger className="w-[120px] neopop-select">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {[2022, 2023, 2024, 2025].map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead className="min-w-[200px]">Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
            </Table>

            <div className="max-h-[450px] overflow-y-auto">
              <Table>
                <TableBody>
                  {filteredExpenses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No expenses found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredExpenses.map((expense) => (
                      <TableRow key={expense.id} className="group">
                        <TableCell className="font-medium">
                          {formatDate(expense.date)}
                        </TableCell>
                        <TableCell>{expense.title}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "flex w-fit items-center gap-1 transition-all",
                              expense.category.toLowerCase() === "shopping" &&
                                "bg-chart-1/10 text-chart-1 hover:bg-chart-1/20",
                              expense.category.toLowerCase() === "food" &&
                                "bg-chart-2/10 text-chart-2 hover:bg-chart-2/20",
                              expense.category.toLowerCase() === "housing" &&
                                "bg-chart-3/10 text-chart-3 hover:bg-chart-3/20",
                              expense.category.toLowerCase() ===
                                "transportation" &&
                                "bg-chart-4/10 text-chart-4 hover:bg-chart-4/20",
                              expense.category.toLowerCase() === "health" &&
                                "bg-red-500/10 text-red-500 hover:bg-red-500/20",
                              expense.category.toLowerCase() === "work" &&
                                "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
                              expense.category.toLowerCase() === "travel" &&
                                "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
                              expense.category.toLowerCase() ===
                                "entertainment" &&
                                "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                            )}
                          >
                            {getCategoryIcon(expense.category)}
                            {expense.category}
                          </Badge>
                        </TableCell>
                        <TableCell>{expense.account}</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(expense.amount)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
                              >
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="neopop-dropdown"
                            >
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer">
                                <PenSquare className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Total amount */}
            <div className="flex justify-end px-4 py-3 border-t bg-muted/50 text-sm font-medium">
              Total: {formatCurrency(totalAmount)}
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Expenses;
