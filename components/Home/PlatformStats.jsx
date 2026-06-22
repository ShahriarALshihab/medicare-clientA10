"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosPublic from "@/lib/axiosPublic";

const StatBlock = ({ value, label, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex flex-col items-center gap-1 rounded-2xl bg-white/10 p-6"
  >
    <span className="font-display text-4xl font-extrabold text-white">{value}+</span>
    <span className="font-body text-sm text-white/70">{label}</span>
  </motion.div>
);

const PlatformStats = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    axiosPublic.get("/stats/platform").then((res) => setStats(res.data));
  }, []);

  const blocks = [
    { label: "Verified Doctors", value: stats.totalDoctors },
    { label: "Registered Patients", value: stats.totalPatients },
    { label: "Appointments Booked", value: stats.totalAppointments },
    { label: "Patient Reviews", value: stats.totalReviews },
  ];

  return (
    <section className="bg-ink py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 md:grid-cols-4 md:px-8">
        {blocks.map((b, i) => (
          <StatBlock key={b.label} value={b.value} label={b.label} index={i} />
        ))}
      </div>
    </section>
  );
};

export default PlatformStats;
