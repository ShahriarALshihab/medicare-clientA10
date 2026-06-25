"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import useAuth from "@/hooks/useAuth";
import usePageTitle from "@/hooks/usePageTitle";

export default function LoginPage() {
  usePageTitle("Login");
  const { loginUser, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await loginUser(e.target.email.value, e.target.password.value);
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (err) {
      setError("Incorrect email or password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-20">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-ink">
          Welcome back!
        </h1>
        <p className="font-body text-sm text-ink/50">
          Log in to manage your appointments
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-white p-7 shadow-sm"
      >
        <input
          name="email"
          type="email"
          required
          placeholder="Email Address"
          className="input input-bordered w-full"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="input input-bordered w-full"
        />

        {error && <p className="text-sm text-error">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="btn border-none bg-primary text-white hover:bg-primary-dark"
        >
          {submitting ? "Logging in..." : "Login"}
        </button>

        <div className="divider text-xs text-ink/40">OR</div>

        <button
          type="button"
          onClick={handleGoogle}
          className="btn btn-outline gap-2 border-primary/20"
        >
          <FcGoogle size={20} /> Continue with Google
        </button>

        <p className="text-center text-sm text-ink/60">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-primary">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
