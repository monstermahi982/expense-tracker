"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import { PlusCircle, CreditCard, ChevronRight } from "lucide-react";
import { bankAccounts } from "@/lib/data";

export function BankAccounts() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  
  return (
    <Card className="neopop-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold">Bank Accounts</CardTitle>
          <CardDescription>
            Manage your linked accounts
          </CardDescription>
        </div>
        <Link href="/accounts/add" className="neopop-btn-sm inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:scale-105">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {bankAccounts.map((account) => (
            <Link 
              href={`/accounts/${account.id}`}
              key={account.id}
              className={cn(
                "flex items-center justify-between p-4 transition-colors hover:bg-muted/50 relative",
                selectedAccount === account.id && "bg-muted"
              )}
              onClick={() => setSelectedAccount(account.id)}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full",
                  account.type === "checking" ? "bg-chart-1/20 text-chart-1" : 
                  account.type === "savings" ? "bg-chart-2/20 text-chart-2" : 
                  "bg-chart-4/20 text-chart-4"
                )}>
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">{account.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {account.institution} • {account.accountNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(account.balance)}</p>
                  <p className={cn(
                    "text-xs",
                    account.change > 0 ? "text-green-500" : "text-red-500"
                  )}>
                    {account.change > 0 ? "+" : ""}{formatCurrency(account.change)} today
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className={cn(
                "absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300",
                selectedAccount === account.id && "w-full"
              )} />
            </Link>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 text-sm text-muted-foreground">
        Last synced 5 minutes ago
      </CardFooter>
    </Card>
  );
}