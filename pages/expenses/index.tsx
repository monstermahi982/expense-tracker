"use client";

import { useEffect, useRef, useState } from "react";
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
  PlusCircle,
  RouteOff,
  Check,
  CheckCircle,
  Cross,
  CircleX,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { expenses, bankAccounts } from "@/lib/data";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { useExpenseStore } from "@/store/expenseStore";
import { Expense } from "@/interfaces/expense";
import { MONTHS } from "@/utils/constant";
import { useBankStore } from "@/store/bankStore";
import { Bank } from "@/server/bank";
import { useTagStore } from "@/store/tagStore";

export interface Tag {
  _id: string;
  name: string;
  color: string;
  userId?: string;
  tagType?: string;
}

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
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>(
    (new Date().getMonth() + 1).toString()
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const bankStore = useBankStore();
  const [bankList, setBankList] = useState<Bank[]>([]);
  const expenseStore = useExpenseStore();
  const [expenseList, setExpenseList] = useState<any>([]);
  const [expenseTotal, setExpenseTotal] = useState<any>(0);

  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [tagList, setTagList] = useState<any[]>([]);
  const tagStore = useTagStore();

  // Add tags to expenses
  useEffect(() => {
    if (expenseList?.length > 0) {
      const taggedExpenses = expenseList.map((expense: Expense) => ({
        ...expense,
        // Assign random tag or use existing one
        tag:
          expense.tag ||
          tagList[Math.floor(Math.random() * tagList.length)]._id,
      }));
      setExpenseList(taggedExpenses);
    }
  }, [expenseStore.expenses]);

  const handleSaveTitle = async (expenseId: string) => {
    try {
      // await updateExpenseTitle(expenseId, editedTitle); // call your API
      setEditingExpenseId(null);
    } catch (err) {
      console.error("Failed to update title", err);
    }
  };

  const handleCancleTitle = () => {
    setEditingExpenseId(null);
  };

  const handleTagChange = (expenseId: string, tagId: string) => {
    const updatedExpenses = expenseList.map((expense: Expense) => {
      if (expense._id === expenseId) {
        return { ...expense, tag: tagId };
      }
      return expense;
    });
    setExpenseList(updatedExpenses);
    setEditingTagId(null);

    // Here you would update the tag in your backend
    // updateExpenseTag(expenseId, tagId);
  };

  const updateExpenseTitle = async (id: string, title: string) => {
    const res = await fetch(`/api/expenses/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      throw new Error("Failed to update title");
    }

    return await res.json();
  };

  const updateExpenseTag = async (id: string, tagId: string) => {
    // Implementation would be similar to updateExpenseTitle
    console.log("Updating tag", id, tagId);
  };

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

  const getTagInfo = (tagId: string) => {
    return tagList.find((tag: Tag) => tag._id === tagId) || tagList[0];
  };

  const updateTag = async (expenseId: string, tagId: string) => {
    await expenseStore.addExpenseTag(expenseId, { tag: tagId });
    await getExpenseData(
      Number(selectedMonth),
      Number(selectedYear),
      selectedBank
    );
  };

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

  const getTagList = async () => {
    await tagStore.getTags();
    setTagList(useTagStore.getState().tagList);
  };

  useEffect(() => {
    getTagList();
  }, []);

  const getExpenseData = async (
    month: number,
    year: number,
    bankId: string | undefined = undefined,
    tag: string | undefined = undefined
  ) => {
    const payload: any = { month: month, year: year, bankId, tag };
    await expenseStore.getExpenses(payload);
    if (useExpenseStore.getState().expenses?.expenses?.length > 0) {
      setExpenseList(useExpenseStore.getState().expenses?.expenses);
      setExpenseTotal(useExpenseStore.getState().expenses?.total);
    } else {
      setExpenseList([]);
      setExpenseTotal(0);
    }
  };

  const resetFilters = async () => {
    await getExpenseData(new Date().getMonth() + 1, new Date().getFullYear());
    setSelectedMonth((new Date().getMonth() + 1).toString());
    setSelectedYear(new Date().getFullYear().toString());
    setSelectedBank("");
  };

  useEffect(() => {
    getExpenseData(Number(selectedMonth), Number(selectedYear), selectedBank);
  }, [selectedBank || selectedMonth || selectedYear]);

  useEffect(() => {
    getExpenseData(
      Number(selectedMonth),
      Number(selectedYear),
      selectedBank,
      selectedTag
    );
  }, [selectedTag]);

  useEffect(() => {
    getExpenseData(new Date().getMonth() + 1, new Date().getFullYear());
  }, []);

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
            <Select
              value={selectedBank}
              onValueChange={(value) => setSelectedBank(value)}
            >
              <SelectTrigger className="w-[200px] neopop-select">
                <SelectValue placeholder="Select Bank" />
              </SelectTrigger>
              <SelectContent>
                {bankList.map((account) => (
                  <SelectItem key={account._id} value={account._id || ""}>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-primary-20 flex items-center justify-center">
                        <Building className="h-3 w-3" />
                      </div>
                      <span>{account.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedMonth}
              onValueChange={(value) => setSelectedMonth(value)}
            >
              <SelectTrigger className="w-[120px] neopop-select">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(12)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {MONTHS[i]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedYear}
              onValueChange={(value) => setSelectedYear(value)}
            >
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
            <Select
              value={selectedTag}
              onValueChange={(value) => setSelectedTag(value)}
            >
              <SelectTrigger className="w-[140px] neopop-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-2 border-black">
                {tagList.map((tag) => (
                  <SelectItem key={tag._id} value={tag._id}>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${tag.color}`}
                      ></div>
                      <span>{tag.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              className="neopop-btn cursor-pointer"
              onClick={resetFilters}
            >
              <RouteOff className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="max-h-[500px] overflow-y-auto">
              <Table>
                <TableHeader className="bg-muted/50 sticky top-0 z-10">
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Bank</TableHead>
                    <TableHead className="text-left">Amount</TableHead>
                    <TableHead className="w-[50px]">Month</TableHead>
                    <TableHead className="w-[50px]">Year</TableHead>
                    <TableHead className="w-[50px]">Tag</TableHead>
                    <TableHead className="w-[50px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenseList?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No expenses found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    expenseList.map((expense: Expense) => (
                      <TableRow
                        key={expense._id}
                        className="group neopop-card hover:bg-purple-400 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all"
                      >
                        <TableCell className="font-medium">
                          {formatDate(expense.date)}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          {editingExpenseId === expense._id ? (
                            <>
                              <Input
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                className="w-2/3 neopop-input"
                              />
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={handleCancleTitle}
                              >
                                <CircleX className="w-4 h-4 text-red-600 cursor-pointer" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleSaveTitle(expense._id)}
                              >
                                <CheckCircle className="w-4 h-4 text-green-600 cursor-pointer" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <span>{expense.title}</span>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                  setEditingExpenseId(expense._id);
                                  setEditedTitle(expense.title);
                                }}
                              >
                                <PenSquare className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 text-black cursor-pointer" />
                              </Button>
                            </>
                          )}
                        </TableCell>
                        <TableCell>{expense.bankName}</TableCell>
                        <TableCell className="text-left font-medium">
                          {formatCurrency(expense.amount)}
                        </TableCell>
                        <TableCell className="text-left font-medium">
                          {/* @ts-ignore */}
                          {MONTHS[expense.month]}
                        </TableCell>
                        <TableCell className="text-left font-medium">
                          {expense.year}
                        </TableCell>
                        <TableCell>
                          {editingTagId === expense._id ? (
                            <Select
                              defaultValue={expense.tag || "untagged"}
                              onValueChange={(value) =>
                                updateTag(expense._id, value)
                              }
                              onOpenChange={(open) => {
                                if (!open) setEditingTagId(null);
                              }}
                            >
                              <SelectTrigger className="w-[140px] neopop-select">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="border-2 border-black">
                                {tagList.map((tag: Tag) => (
                                  <SelectItem key={tag._id} value={tag._id}>
                                    <div className="flex items-center gap-2">
                                      <div
                                        className={`h-3 w-3 rounded-full ${tag.color}`}
                                      ></div>
                                      <span>{tag.name}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge
                              className={`${
                                getTagInfo(expense?.tag).color
                              } text-white hover:${
                                getTagInfo(expense?.tag).color
                              } py-1 cursor-pointer border-2 w-full font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-none transition-all`}
                              onClick={() => setEditingTagId(expense._id)}
                            >
                              <div className="flex w-fit items-center gap-1">
                                <Tag className="h-3 w-3" />
                                <span className="w-fit">
                                  {getTagInfo(expense.tag).name}
                                </span>
                              </div>
                            </Badge>
                          )}
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
              Total: {formatCurrency(expenseTotal)}
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Expenses;
