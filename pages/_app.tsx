// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const publicRoutes = ["/login", "/register"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loadUserFromStorage = useUserStore(
    (state) => state.loadUserFromStorage
  );
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check if current route is public
    const isPublicRoute = publicRoutes.includes(router.pathname);

    if (!token && !isPublicRoute) {
      router.replace("/login");
    } else if (token && isPublicRoute) {
      router.replace("/");
    } else {
      setIsAuthenticated(!!token);
    }

    setLoading(false);
  }, [router.pathname]);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Component {...pageProps} />
      <Toaster />
      <ToastContainer />
    </ThemeProvider>
  );
}
