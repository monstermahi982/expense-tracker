"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, CreditCard, PieChart, Settings } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/",
    },
    {
      href: "/accounts",
      label: "Accounts",
      icon: CreditCard,
      active: pathname === "/accounts",
    },
    {
      href: "/analytics",
      label: "Analytics",
      icon: PieChart,
      active: pathname === "/analytics",
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/settings",
    },
  ];

  return (
    <div className="flex items-center">
      <Link 
        href="/" 
        className="mr-6 flex items-center space-x-2"
      >
        <span className="hidden font-bold sm:inline-block text-xl">
          <span className="text-primary">Neo</span>
          <span className="text-chart-4">Track</span>
        </span>
      </Link>
      <nav className="hidden md:flex items-center space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              route.active
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <route.icon className="mr-2 h-4 w-4" />
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}