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
import { useAnalyticsStore } from "@/store/analyticsStore";
import { Analytics } from "@/server/analytics";

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

const AnalyticTypes = ["MONTHLY", "YEARLY", "QUARTERLY"];

const AnalyticsPage = () => {
  const [selected, setSelected] = useState<string | null>("MONTHLY");
  const analyticsStore = useAnalyticsStore();
  const [anayticsList, setAnayticsList] = useState<any>([]);

  const getAnalyticsData = async (type: string) => {
    await analyticsStore.byDuration(type);
    if (useAnalyticsStore.getState().analytics?.length > 0) {
      setAnayticsList(useAnalyticsStore.getState().analytics);
    } else {
      setAnayticsList([]);
    }
  };

  useEffect(() => {
    if (selected) getAnalyticsData(selected.toLocaleLowerCase());
  }, [selected]);

  return (
    <DashboardLayout>
      <div className="mx-5 md:mx-20 my-5">
        <h3 className="mb-5 text-2xl font-semibold">Select Report Type :-</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-10">
          {AnalyticTypes.map((item) => (
            <div
              key={item}
              onClick={() => setSelected(item)}
              className={`neopop-card py-3 rounded-xl text-center font-medium text-md cursor-pointer 
            ${
              selected === item
                ? "bg-purple-600 text-white"
                : "hover:bg-purple-600 hover:text-white"
            }
          `}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <Card className="neopop-card mx-5 md:mx-20 my-5">
        <CardHeader className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <CardTitle className="text-xl font-bold">
              Expenses Analytics
            </CardTitle>
            <CardDescription>
              Analytics on{" "}
              <b className="capitalize">{selected?.toLocaleLowerCase()}</b> type
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="max-h-[500px] overflow-y-auto">
              {selected === "MONTHLY" && (
                <Table className="w-full">
                  <TableHeader className="bg-muted/50 sticky top-0 z-10">
                    <TableRow>
                      <TableHead className="text-left">Month</TableHead>
                      <TableHead className="text-left">Year</TableHead>
                      <TableHead className="text-left">
                        Total Expenses
                      </TableHead>
                      <TableHead className="text-left">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {anayticsList?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          No expenses found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      anayticsList.map((expense: Analytics, index: number) => (
                        <TableRow
                          key={index}
                          className="group neopop-card hover:bg-purple-400 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all"
                        >
                          <TableCell className="text-left font-medium">
                            {MONTHS[expense.month]}
                          </TableCell>
                          <TableCell className="text-left font-medium">
                            {expense.year}
                          </TableCell>
                          <TableCell className="text-left">
                            {expense.count}
                          </TableCell>
                          <TableCell className="text-left font-medium">
                            {formatCurrency(expense.totalAmount)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
              {selected === "YEARLY" && (
                <Table className="w-full">
                  <TableHeader className="bg-muted/50 sticky top-0 z-10">
                    <TableRow>
                      <TableHead className="text-left">Year</TableHead>
                      <TableHead className="text-left">
                        Total Expenses
                      </TableHead>
                      <TableHead className="text-left">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {anayticsList?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          No expenses found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      anayticsList.map((expense: Analytics, index: number) => (
                        <TableRow
                          key={index}
                          className="group neopop-card hover:bg-purple-400 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all"
                        >
                          <TableCell className="text-left font-medium">
                            {expense.year}
                          </TableCell>
                          <TableCell className="text-left">
                            {expense.count}
                          </TableCell>
                          <TableCell className="text-left font-medium">
                            {formatCurrency(expense.totalAmount)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
              {selected === "QUARTERLY" && (
                <Table className="w-full">
                  <TableHeader className="bg-muted/50 sticky top-0 z-10">
                    <TableRow>
                      <TableHead className="text-left">Quater</TableHead>
                      <TableHead className="text-left">
                        Total Expenses
                      </TableHead>
                      <TableHead className="text-left">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {anayticsList?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          No expenses found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      anayticsList.map((expense: Analytics, index: number) => (
                        <TableRow
                          key={index}
                          className="group neopop-card hover:bg-purple-400 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all"
                        >
                          <TableCell className="text-left font-medium">
                            {expense.quarter}
                          </TableCell>
                          <TableCell className="text-left">
                            {expense.count}
                          </TableCell>
                          <TableCell className="text-left font-medium">
                            {formatCurrency(expense.totalAmount)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
