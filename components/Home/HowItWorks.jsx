"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    step: "01",
    icon: "🔍",
    title: "Search a Doctor",
    desc: "Browse by specialization, location, or doctor name. Filter by availability, fee, and ratings.",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    dot: "bg-blue-500",
  },
  {
    step: "02",
    icon: "📅",
    title: "Book Appointment",
    desc: "Choose your preferred day and time slot. Fill in your symptoms and confirm your booking instantly.",
    color: "bg-primary-light text-primary border-primary/20",
    dot: "bg-primary",
  },
  {
    step: "03",
    icon: "💳",
    title: "Pay Online",
    desc: "Secure payment via Stripe. Get an instant confirmation with all appointment details.",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    dot: "bg-amber-500",
  },
  {
    step: "04",
    icon: "🩺",
    title: "Consult & Heal",
    desc: "Visit your doctor at the scheduled time. Receive prescriptions digitally through your dashboard.",
    color: "bg-green-50 text-green-600 border-green-100",
    dot: "bg-green-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-wider text-primary">
            Simple Process
          </p>
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 font-body text-sm text-ink/50 max-w-md mx-auto">
            Book a doctor appointment in just 4 simple steps — fast, easy, and reliable.
          </p>
        </div>

  
        <div className="relative grid gap-8 md:grid-cols-4">
          {/* Connector line — desktop only */}
          <div className="absolute top-10 left-[12.5%] right-[12.5%] hidden h-0.5 bg-primary/10 md:block" />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Icon Circle */}
              <div className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border-2 ${s.color} text-4xl shadow-sm mb-4`}>
                {s.icon}
                {/* Step number badge */}
                <span className={`absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full ${s.dot} text-white text-xs font-bold`}>
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-ink mb-2">
                {s.title}
              </h3>
              <p className="font-body text-sm text-ink/60 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/find-doctors"
            className="btn border-none bg-primary text-white hover:bg-primary-dark px-10"
          >
            Book Appointment Now →
          </Link>
        </div>
      </div>
    </section>
  );
}
