"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1400&q=80",
    alt: "Doctor consulting patient",
  },
  {
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1400&q=80",
    alt: "Modern hospital facility",
  },
  {
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1400&q=80",
    alt: "Doctor with stethoscope",
  },
  {
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=80",
    alt: "Medical consultation",
  },
  {
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1400&q=80",
    alt: "Healthcare professionals",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrent((p) => (p + 1) % slides.length);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* ── Slideshow Background ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].alt}
            fill
            className="object-cover"
            priority
          />
          {/* Blur + dark overlay */}
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Slide Controls ── */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/40 transition-all duration-200"
        aria-label="Previous slide"
      >
        <HiChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/40 transition-all duration-200"
        aria-label="Next slide"
      >
        <HiChevronRight size={22} />
      </button>

      {/* ── Slide Dots ── */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-7 bg-primary" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary-light backdrop-blur-sm border border-primary/30">
            🏥 Healthcare, Simplified
          </span>

          <h1 className="font-display text-4xl font-extrabold leading-tight text-white md:text-6xl">
            Book trusted doctors{" "}
            <span className="text-primary">without</span> the waiting room.
          </h1>

          <p className="mt-5 max-w-lg font-body text-lg text-white/80 leading-relaxed">
            MediCare Connect brings patients, doctors, and hospitals onto one
            secure platform — book appointments, pay online, and manage your
            medical records in a few clicks.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/find-doctors"
              className="btn border-none bg-primary px-8 text-white hover:bg-primary-dark shadow-lg shadow-primary/30"
            >
              Find a Doctor →
            </Link>
            <Link
              href="/register"
              className="btn border-2 border-white/60 bg-white/10 px-8 text-white backdrop-blur-sm hover:bg-white/20"
            >
              Get Started
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 flex flex-wrap gap-8">
            {[
              { num: "500+", label: "Verified Doctors" },
              { num: "10K+", label: "Happy Patients" },
              { num: "50+", label: "Specializations" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-bold text-white">
                  {s.num}
                </p>
                <p className="text-sm text-white/60 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
