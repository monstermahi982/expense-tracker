import { Input } from "@/components/ui/input";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { loginUser } from "@/server/user";
import { toast } from "react-toastify"; // Optional: for showing error/success toasts
import { useUserStore } from "@/store/userStore";

export default function Login() {
  const router = useRouter();
  const { login } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the login API function
      const response = await loginUser({ email, password });

      // After successful login, store user data in Zustand store
      login({
        token: response.token,
        email: response.email,
        name: response.name,
      });

      // Redirect user to the home/dashboard page
      router.push("/");
    } catch (error: any) {
      // Handle errors (e.g., wrong credentials)
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className="flex items-center justify-center min-h-screen bg-primary px-4">
        <div className="neopop-card shadow-lg rounded-2xl p-8 w-full max-w-md text-gray-900">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Login
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                type="email"
                className="pl-7 neopop-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <Input
                type="password"
                className="pl-7 neopop-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-sm text-right text-primary">
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="neopop-btn px-10 cursor-pointer py-2 rounded-xl"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Submit"}
              </button>
            </div>
          </form>

          <p className="text-sm mt-6 text-center text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={() => router.push("/register")}
              className="hover:underline text-primary"
            >
              Create
            </button>
          </p>
        </div>
      </main>
    </>
  );
}
