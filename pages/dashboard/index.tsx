import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { BankAccounts } from "@/components/bank-accounts";
import { RecentExpenses } from "@/components/recent-expenses";
import { ExpenseOverview } from "@/components/expense-overview";
import { SpendingByCategory } from "@/components/spending-by-category";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ExpenseOverview />
        <SpendingByCategory />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <BankAccounts />
        </div>
        <div className="lg:col-span-7">
          <RecentExpenses />
        </div>
      </div>
    </DashboardLayout>
  );
}
