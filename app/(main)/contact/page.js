"use client";

import toast from "react-hot-toast";
import usePageTitle from "@/hooks/usePageTitle";

export default function ContactPage() {
  usePageTitle("Contact Us");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! Our team will get back to you shortly.");
    e.target.reset();
  };

  return (
    <div className="section-padding mx-auto max-w-2xl py-16">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-ink">Contact Us</h1>
        <p className="font-body text-sm text-ink/50">We usually reply within one business day.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-white p-7 shadow-sm">
        <input required placeholder="Your Name" className="input input-bordered w-full" />
        <input required type="email" placeholder="Your Email" className="input input-bordered w-full" />
        <textarea required placeholder="How can we help?" rows={5} className="textarea textarea-bordered w-full" />
        <button type="submit" className="btn border-none bg-primary text-white hover:bg-primary-dark">
          Send Message
        </button>
      </form>
    </div>
  );
}
