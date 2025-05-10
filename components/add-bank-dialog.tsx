"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building } from "lucide-react";

interface AddBankDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddBankDialog({ open, onOpenChange }: AddBankDialogProps) {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally save the bank data
    toast.success("Bank account added successfully");
    setBankName("");
    setAccountNumber("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] neopop-modal">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Bank Account</DialogTitle>
          <DialogDescription>
            Enter your bank account details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex items-center justify-center mb-6">
            <div className="h-20 w-20 bg-primary/20 rounded-full flex items-center justify-center">
              <Building className="h-10 w-10" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="bankName" className="block text-sm font-medium mb-2">
                Bank Name
              </label>
              <Input
                id="bankName"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="neopop-input"
                placeholder="Enter bank name"
              />
            </div>
            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium mb-2">
                Account Number
              </label>
              <Input
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="neopop-input"
                placeholder="Enter account number"
                type="password"
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="neopop-btn"
            >
              Cancel
            </Button>
            <Button type="submit" className="neopop-btn">
              Add Bank
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}