import Head from "next/head";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
    <>
      <Head>
        <title>Neotrack</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta
          name="description"
          content="This is expense tracking app for personal finance management"
        />
        <meta
          name="keywords"
          content="Neotrack, expense tracker, finance managment"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>
      <div className={inter.className}>
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
      </div>
    </>
  );
}
