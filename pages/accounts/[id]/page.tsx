"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  PlusCircle, 
  Download, 
  Upload,
  CreditCard,
  PiggyBank,
  Wallet
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { RecentExpenses } from "@/components/recent-expenses";
import { formatCurrency } from "@/lib/formatters";
import { bankAccounts, expenses } from "@/lib/data";
import { AddExpenseDialog } from "@/components/add-expense-dialog";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return bankAccounts.map((account) => ({
    id: account.id,
  }));
}

export default function AccountDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [account, setAccount] = useState<any | null>(null);
  const [filteredExpenses, setFilteredExpenses] = useState<any[]>([]);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);

  const accountId = typeof params.id === 'string' ? params.id : '';

  // Find the account data based on the ID
  useEffect(() => {
    const foundAccount = bankAccounts.find(acc => acc.id === accountId);
    if (foundAccount) {
      setAccount(foundAccount);
      // Filter expenses for this account
      const accountExpenses = expenses.filter(exp => exp.accountId === accountId);
      setFilteredExpenses(accountExpenses);
    } else {
      // Redirect to accounts page if account not found
      router.push('/accounts');
    }
  }, [accountId, router]);

  const getAccountIcon = useCallback(() => {
    if (!account) return <CreditCard className="h-6 w-6" />;
    
    switch(account.type) {
      case 'checking':
        return <CreditCard className="h-6 w-6" />;
      case 'savings':
        return <PiggyBank className="h-6 w-6" />;
      default:
        return <Wallet className="h-6 w-6" />;
    }
  }, [account]);

  if (!account) {
    return <div className="container py-10">Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.back()}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Account Details</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="neopop-btn-sm"
              onClick={() => setIsExpenseDialogOpen(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="neopop-btn-sm"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="neopop-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                Account
              </CardTitle>
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full",
                account.type === "checking" ? "bg-chart-1/20 text-chart-1" : 
                account.type === "savings" ? "bg-chart-2/20 text-chart-2" : 
                "bg-chart-4/20 text-chart-4"
              )}>
                {getAccountIcon()}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{account.name}</div>
              <p className="text-xs text-muted-foreground">
                {account.institution} • {account.accountNumber}
              </p>
            </CardContent>
          </Card>
          <Card className="neopop-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                Current Balance
              </CardTitle>
              <div className="h-8 w-8 rounded-full -20 text-primary flex items-center justify-center">
                <Wallet className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(account.balance)}</div>
              <p className={cn(
                "text-xs", 
                account.change >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {account.change >= 0 ? "+" : ""}{formatCurrency(account.change)} today
              </p>
            </CardContent>
          </Card>
          <Card className="neopop-card sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                Last Transactions
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                <Upload className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredExpenses.length > 0 ? 
                  formatCurrency(filteredExpenses[0].amount) : 
                  "$0.00"
                }
              </div>
              <p className="text-xs text-muted-foreground">
                {filteredExpenses.length > 0 ? 
                  filteredExpenses[0].title : 
                  "No recent transactions"
                }
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="expenses" className="space-y-4">
          <TabsList className="neopop-tabs">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="transactions">All Transactions</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="expenses" className="space-y-4">
            <RecentExpenses />
          </TabsContent>
          <TabsContent value="transactions" className="space-y-4">
            <Card className="neopop-card">
              <CardHeader>
                <CardTitle>All Transactions</CardTitle>
                <CardDescription>
                  View all transactions for this account, including deposits and transfers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Transaction history will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="insights" className="space-y-4">
            <Card className="neopop-card">
              <CardHeader>
                <CardTitle>Account Insights</CardTitle>
                <CardDescription>
                  View insights and analytics for this account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Account insights will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AddExpenseDialog
        open={isExpenseDialogOpen}
        onOpenChange={setIsExpenseDialogOpen}
      />
    </DashboardLayout>
  );
}