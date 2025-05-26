"use client";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Wallet,
  Building,
  ArrowUpDown,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { AddBankDialog } from "@/components/add-bank-dialog";
import { useEffect, useRef, useState } from "react";
import { useBankStore } from "@/store/bankStore";
import { Bank } from "@/server/bank";

export default function AccountsPage() {
  const [isAddBankOpen, setIsAddBankOpen] = useState(false);
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

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">Accounts</h1>
          <div className="flex items-center space-x-2">
            <Button
              className="neopop-btn"
              onClick={() => setIsAddBankOpen(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="neopop-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                Total Balance
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary-20 text-primary flex items-center justify-center">
                <Wallet className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$29,747.14</div>
              <p className="text-xs text-green-500">+$240.94 this month</p>
            </CardContent>
          </Card>
          <Card className="neopop-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                Connected Banks
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-chart-2/20 text-chart-2 flex items-center justify-center">
                <Building className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Chase, Wells Fargo, BOA, Ally
              </p>
            </CardContent>
          </Card>
          <Card className="neopop-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                Recent Activity
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-chart-4/20 text-chart-4 flex items-center justify-center">
                <ArrowUpDown className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">22</div>
              <p className="text-xs text-muted-foreground">
                Transactions this week
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="neopop-card">
          <CardHeader>
            <CardTitle>Already Added Accounts</CardTitle>
          </CardHeader>
          {bankList.length === 0 && (
            <div className="flex justify-center">
              <h3 className="text-gray-400 font-mono">No Banks Added</h3>
            </div>
          )}
          <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bankList.map((bank: Bank, index: number) => (
              <div
                key={index}
                className="relative neopop-card flex flex-col items-center justify-between rounded-lg border p-4 hover:bg-accent/10 transition-colors"
              >
                <div className="absolute top-2 right-2 cursor-pointer">
                  <Trash2 className="h-4 w-4 text-red-400" />
                </div>
                <div className="mb-3 rounded-full bg-primary-10 p-2">
                  <div className="h-6 w-6 bg-primary-20 rounded-full flex items-center justify-center">
                    <Building className="h-8 w-8" />
                  </div>
                </div>
                <div className="text-sm font-medium">{bank?.name}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <AddBankDialog open={isAddBankOpen} onOpenChange={setIsAddBankOpen} />
    </DashboardLayout>
  );
}
