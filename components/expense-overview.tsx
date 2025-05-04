"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from "recharts";
import { formatCurrency } from "@/lib/formatters";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { expenseData } from "@/lib/data";

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Date
            </span>
            <span className="font-bold text-xs">{label}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Expenses
            </span>
            <span className="font-bold text-xs">{formatCurrency(payload[0].value as number)}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export function ExpenseOverview() {
  // Calculate total expenses from data
  const totalExpenses = expenseData.reduce((sum, entry) => sum + entry.amount, 0);
  
  // Calculate percentage change (assuming last month's total was $3200)
  const lastMonthTotal = 3200;
  const percentageChange = ((totalExpenses - lastMonthTotal) / lastMonthTotal) * 100;
  const isPositive = percentageChange >= 0;

  return (
    <Card className="neopop-card">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Expense Overview</CardTitle>
        <CardDescription>
          Your spending for the current month
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4 pt-0">
        <div className="flex items-baseline space-x-3 mb-6">
          <h3 className="text-3xl font-bold">{formatCurrency(totalExpenses)}</h3>
          <div className={cn(
            "flex items-center text-xs font-medium",
            isPositive ? "text-red-500" : "text-green-500"
          )}>
            {isPositive ? (
              <ArrowUpRight className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDownRight className="mr-1 h-4 w-4" />
            )}
            <span>{Math.abs(percentageChange).toFixed(1)}% from last month</span>
          </div>
        </div>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={expenseData}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
              className="[&_.recharts-cartesian-grid-horizontal_line]:stroke-muted [&_.recharts-cartesian-grid-vertical_line]:stroke-muted"
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.split(' ')[0]}
                className="text-xs text-muted-foreground"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
                tickMargin={8}
                className="text-xs text-muted-foreground"
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#colorAmount)"
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 0, fill: "hsl(var(--chart-1))" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}