"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { HiMail, HiArrowLeft } from "react-icons/hi";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
      toast.success("Password reset email sent!");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else {
        toast.error("Failed to send reset email. Try again.");
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-20">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <HiMail size={32} className="text-primary" />
        </div>
        <h1 className="font-display text-3xl font-bold text-ink">
          Forgot Password?
        </h1>
        <p className="font-body mt-2 text-sm text-ink/50">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      {sent ? (
        <div className="rounded-2xl border border-primary/10 bg-white p-7 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
            <span className="text-3xl">✅</span>
          </div>
          <h2 className="font-display text-xl font-bold text-ink mb-2">
            Email Sent!
          </h2>
          <p className="text-sm text-ink/60 mb-6">
            We sent a password reset link to{" "}
            <span className="font-semibold text-primary">{email}</span>.
            Check your inbox and follow the instructions.
          </p>
          <Link
            href="/login"
            className="btn border-none bg-primary text-white hover:bg-primary-dark w-full"
          >
            Back to Login
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-white p-7 shadow-sm"
        >
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="btn border-none bg-primary text-white hover:bg-primary-dark"
          >
            {sending ? "Sending..." : "Send Reset Link"}
          </button>

          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm text-ink/60 hover:text-primary transition-colors"
          >
            <HiArrowLeft size={16} /> Back to Login
          </Link>
        </form>
      )}
    </div>
  );
}
