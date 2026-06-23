"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section className="bg-primary-light">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-wider text-primary">
            Healthcare, simplified
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">
            Book trusted doctors <br /> without the waiting room.
          </h1>
          <p className="mt-4 max-w-md font-body text-ink/60">
            MediCare Connect brings patients, doctors, and hospitals onto one
            secure platform — book appointments, pay online, and manage your
            medical records in a few clicks.
          </p>
          <div className="mt-7 flex gap-4">
            <Link
              href="/find-doctors"
              className="btn border-none bg-primary px-8 text-white hover:bg-primary-dark"
            >
              Find a Doctor
            </Link>
            <Link
              href="/register"
              className="btn btn-outline border-primary px-8 text-primary hover:bg-primary hover:text-white"
            >
              Get Started
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative h-72 w-full overflow-hidden rounded-3xl shadow-xl md:h-96"
        >
          <Image
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&auto=format&fit=crop&q=60"
            alt="Doctor consulting a patient"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
