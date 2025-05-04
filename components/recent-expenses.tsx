"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  PartyPopper
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { expenses } from "@/lib/data";

const categoryIcons: Record<string, any> = {
  "shopping": ShoppingBag,
  "food": Utensils,
  "housing": Home,
  "transportation": Car,
  "health": HeartPulse,
  "work": Briefcase,
  "travel": Plane,
  "entertainment": PartyPopper,
};

export function RecentExpenses() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredExpenses = expenses.filter(expense => 
    expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryIcon = (category: string) => {
    const Icon = categoryIcons[category.toLowerCase()] || ShoppingBag;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <Card className="neopop-card">
      <CardHeader className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <CardTitle className="text-xl font-bold">Recent Expenses</CardTitle>
          <CardDescription>
            Your latest transactions across all accounts
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative w-full md:w-[180px] lg:w-[260px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search expenses..."
              className="pl-8 neopop-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9 neopop-btn">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
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
                          expense.category.toLowerCase() === "shopping" && "bg-chart-1/10 text-chart-1 hover:bg-chart-1/20",
                          expense.category.toLowerCase() === "food" && "bg-chart-2/10 text-chart-2 hover:bg-chart-2/20",
                          expense.category.toLowerCase() === "housing" && "bg-chart-3/10 text-chart-3 hover:bg-chart-3/20",
                          expense.category.toLowerCase() === "transportation" && "bg-chart-4/10 text-chart-4 hover:bg-chart-4/20",
                          expense.category.toLowerCase() === "health" && "bg-red-500/10 text-red-500 hover:bg-red-500/20",
                          expense.category.toLowerCase() === "work" && "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
                          expense.category.toLowerCase() === "travel" && "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
                          expense.category.toLowerCase() === "entertainment" && "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
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
                        <DropdownMenuContent align="end" className="neopop-dropdown">
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
      </CardContent>
    </Card>
  );
}