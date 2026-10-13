"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { num: "10,000+", label: "Patients Served", icon: "👥" },
  { num: "500+", label: "Verified Doctors", icon: "👨‍⚕️" },
  { num: "50+", label: "Specializations", icon: "🏥" },
  { num: "98%", label: "Satisfaction Rate", icon: "⭐" },
];

const testimonials = [
  {
    name: "Rahim Uddin",
    role: "Patient",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "MediCare Connect made it so easy to find a cardiologist near me. I booked an appointment in under 2 minutes and the doctor was excellent!",
    rating: 5,
  },
  {
    name: "Fatema Khanam",
    role: "Patient",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "I love how I can manage all my family's appointments in one place. The prescription system is a game changer for us.",
    rating: 5,
  },
  {
    name: "Karim Hossain",
    role: "Patient",
    photo: "https://randomuser.me/api/portraits/men/67.jpg",
    text: "Found an amazing neurologist through this platform. The whole process from booking to payment was seamless and transparent.",
    rating: 5,
  },
];

export default function StatsTestimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-primary-light to-white">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm border border-primary/10"
            >
              <span className="text-3xl mb-2">{s.icon}</span>
              <p className="font-display text-3xl font-bold text-primary">
                {s.num}
              </p>
              <p className="font-body text-sm text-ink/60 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-12">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-wider text-primary">
            Patient Stories
          </p>
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
            What Our Patients Say
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-amber-400 text-sm">
                    ★
                  </span>
                ))}
              </div>

              <p className="font-body text-sm text-ink/70 leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-primary/10">
                <div className="relative h-10 w-10 overflow-hidden rounded-full flex-shrink-0">
                  <Image
                    src={t.photo}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-body text-sm font-bold text-ink">
                    {t.name}
                  </p>
                  <p className="font-body text-xs text-ink/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
