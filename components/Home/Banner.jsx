"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const slides = [
  { image: "/hero/slide-1.jpg", alt: "Doctor consulting patient" },
  { image: "/hero/slide-2.jpg", alt: "Modern hospital facility" },
  { image: "/hero/slide-3.jpg", alt: "Doctor with stethoscope" },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const [broken, setBroken] = useState([]);

  // Only keep slides whose image loaded successfully
  const activeSlides = slides.filter((s) => !broken.includes(s.image));
  const total = activeSlides.length;
  const safeIndex = total ? current % total : 0;
  const slide = activeSlides[safeIndex];

  // Auto-play
  useEffect(() => {
    if (total < 2) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  const markBroken = (src) =>
    setBroken((prev) => (prev.includes(src) ? prev : [...prev, src]));

  const prev = () => setCurrent((p) => (p - 1 + total) % total);
  const next = () => setCurrent((p) => (p + 1) % total);

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-primary-dark">
      {/* Slideshow background (skipped if every image failed) */}
      {slide && (
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              priority
              onError={() => markBroken(slide.image)}
            />
            <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Arrows and dots only when there is more than one working slide */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/40"
            aria-label="Previous slide"
          >
            <HiChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/40"
            aria-label="Next slide"
          >
            <HiChevronRight size={22} />
          </button>

          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {activeSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === safeIndex ? "w-7 bg-primary" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Content (unchanged) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary-light backdrop-blur-sm">
            🏥 Healthcare, Simplified
          </span>

          <h1 className="font-display text-4xl font-extrabold leading-tight text-white md:text-6xl">
            Book trusted doctors <span className="text-primary">without</span>{" "}
            the waiting room.
          </h1>

          <p className="mt-5 max-w-lg font-body text-lg leading-relaxed text-white/80">
            MediCare Connect brings patients, doctors, and hospitals onto one
            secure platform — book appointments, pay online, and manage your
            medical records in a few clicks.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/find-doctors"
              className="btn border-none bg-primary px-8 text-white shadow-lg shadow-primary/30 hover:bg-primary-dark"
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
                <p className="mt-0.5 text-sm text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
