"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const specializations = [
  { label: "Cardiology", icon: "❤️", desc: "Heart & cardiovascular care" },
  { label: "Neurology", icon: "🧠", desc: "Brain & nervous system" },
  { label: "Orthopedics", icon: "🦴", desc: "Bones, joints & muscles" },
  { label: "Pediatrics", icon: "👶", desc: "Children's healthcare" },
  { label: "Dermatology", icon: "✋", desc: "Skin, hair & nails" },
  { label: "Gynecology", icon: "🌸", desc: "Women's health" },
  { label: "Psychiatry", icon: "🧘", desc: "Mental health & wellbeing" },
  { label: "Ophthalmology", icon: "👁️", desc: "Eye care & vision" },
  { label: "Gastroenterology", icon: "🫁", desc: "Digestive system" },
  { label: "General Medicine", icon: "🩺", desc: "Primary healthcare" },
];

export default function Specializations() {
  const router = useRouter();

  const handleClick = (label) => {
    router.push(`/find-doctors?specialization=${encodeURIComponent(label)}`);
  };

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-wider text-primary">
            Browse By
          </p>
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
            Medical Specializations
          </h2>
          <p className="mt-3 font-body text-sm text-ink/50 max-w-md mx-auto">
            Click on any specialization to instantly find the right specialist for you.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {specializations.map((spec, i) => (
            <motion.button
              key={spec.label}
              onClick={() => handleClick(spec.label)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-3xl group-hover:scale-110 transition-transform duration-300">
                {spec.icon}
              </div>
              <div>
                <p className="font-body text-sm font-bold text-ink group-hover:text-primary transition-colors">
                  {spec.label}
                </p>
                <p className="font-body text-xs text-ink/40 mt-0.5 leading-tight">
                  {spec.desc}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
