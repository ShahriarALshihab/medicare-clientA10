"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🔒",
    title: "Secure Authentication",
    desc: "Firebase-powered login with Google OAuth. Your data is always protected.",
    color: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    icon: "📋",
    title: "Digital Prescriptions",
    desc: "Doctors issue digital prescriptions you can access anytime from your dashboard.",
    color: "bg-green-50 border-green-100",
    iconBg: "bg-green-100 text-green-600",
  },
  {
    icon: "💳",
    title: "Online Payments",
    desc: "Pay consultation fees securely via Stripe. Get instant receipts and payment history.",
    color: "bg-amber-50 border-amber-100",
    iconBg: "bg-amber-100 text-amber-600",
  },
  {
    icon: "🗓️",
    title: "Smart Scheduling",
    desc: "Doctors manage their own schedules. Patients see real-time availability.",
    color: "bg-primary-light border-primary/20",
    iconBg: "bg-primary/10 text-primary",
  },
  {
    icon: "⭐",
    title: "Verified Reviews",
    desc: "Only real patients who completed appointments can leave reviews. Trustworthy ratings.",
    color: "bg-purple-50 border-purple-100",
    iconBg: "bg-purple-100 text-purple-600",
  },
  {
    icon: "📊",
    title: "Personal Analytics",
    desc: "Track your appointment history, spending, and health journey with visual insights.",
    color: "bg-rose-50 border-rose-100",
    iconBg: "bg-rose-100 text-rose-600",
  },
];

export default function AppFeatures() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-wider text-primary">
            Platform Features
          </p>
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
            Everything You Need, In One Place
          </h2>
          <p className="mt-3 font-body text-sm text-ink/50 max-w-md mx-auto">
            MediCare Connect is packed with features designed to make healthcare
            simple, transparent, and accessible for everyone.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`rounded-2xl border {f.color} p-6 transition-all duration-300 hover:shadow-md`}
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl {f.iconBg} text-2xl`}>
                {f.icon}
              </div>
              <h3 className="font-display text-base font-bold text-ink mb-2">
                {f.title}
              </h3>
              <p className="font-body text-sm text-ink/60 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
