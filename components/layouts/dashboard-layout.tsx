"use client";

import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { AddExpenseButton } from "@/components/add-expense-button";
import { AddExpenseDialog } from "@/components/add-expense-dialog";
import Footer from "../shared/Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-2 md:mx-10 flex h-16 items-center justify-between py-4">
          <MainNav />
          <div className="flex items-center gap-4">
            <AddExpenseButton onClick={() => setIsExpenseDialogOpen(true)} />
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1 py-6 mx-2 md:mx-10">{children}</main>
      <AddExpenseDialog
        open={isExpenseDialogOpen}
        onOpenChange={setIsExpenseDialogOpen}
      />
      <Footer />
    </div>
  );
}
