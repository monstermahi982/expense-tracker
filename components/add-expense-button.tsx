"use client";
import '@/styles/globals.css'
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function AddExpenseButton() {
  const router = useRouter();

  return (
    <Button 
      onClick={() => router.push("/add-expense")}
      className="neopop-btn"
    >
      <PlusCircle className="mr-2 h-4 w-4" />
      Add Expense
    </Button>
  );
}