import { Input } from "@/components/ui/input";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Register() {
    const router = useRouter();
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <main className="flex items-center justify-center min-h-screen bg-primary px-4">
        <div className="neopop-card shadow-lg rounded-2xl p-8 w-full max-w-md text-gray-900">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Create Account
          </h2>

          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <Input
                type="text"
                className="pl-7 neopop-input"
                placeholder="enter your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                type="email"
                className="pl-7 neopop-input"
                placeholder="enter your email"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <Input
                type="number"
                className="pl-7 neopop-input"
                placeholder="enter your email"
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
                placeholder="enter your password"
              />
            </div>

            <div className="text-sm text-right text-primary">
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="neopop-btn px-10 cursor-pointer py-2 rounded-xl"
              >
                Submit
              </button>
            </div>
          </form>

          <p className="text-sm mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <button onClick={() => router.push("/login")} className=" hover:underline text-primary">
              Login
            </button>
          </p>
        </div>
      </main>
    </>
  );
}
