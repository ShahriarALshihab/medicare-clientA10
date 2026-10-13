"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import axiosPublic from "@/lib/axiosPublic";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";

export default function FeaturedDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/doctors/featured")
      .then((res) => setDoctors(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-wider text-primary">
            Top Rated
          </p>
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
            Meet Our Featured Doctors
          </h2>
          <p className="mt-3 font-body text-sm text-ink/50 max-w-md mx-auto">
            Handpicked specialists with outstanding patient reviews and proven expertise.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching featured doctors..." />
        ) : doctors.length === 0 ? (
          <p className="text-center font-body text-ink/50 py-10">
            No verified doctors yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor, i) => (
              <motion.div
                key={doctor._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={
                      doctor.profileImage ||
                      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80"
                    }
                    alt={doctor.doctorName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
                    {doctor.specialization}
                  </span>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 backdrop-blur-sm">
                    <FaStar className="text-amber-400" size={11} />
                    <span className="text-xs font-bold text-ink">
                      {doctor.ratingAverage?.toFixed(1) || "New"}
                    </span>
                    <span className="text-xs text-ink/50">
                      ({doctor.ratingCount || 0})
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-display text-base font-bold text-ink">
                    {doctor.doctorName}
                  </h3>
                  <p className="flex items-center gap-1.5 text-xs text-ink/50">
                    <FaMapMarkerAlt size={11} className="text-primary" />
                    {doctor.hospitalName}
                  </p>
                  <p className="text-xs text-ink/50">
                    {doctor.experience} yrs experience
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-primary/10">
                    <span className="font-display text-sm font-bold text-ink">
                      ${doctor.consultationFee}
                      <span className="font-body text-xs font-normal text-ink/40">
                        /visit
                      </span>
                    </span>
                    <Link
                      href={`/doctors/{doctor._id}`}
                      className="btn btn-sm border-none bg-primary text-white hover:bg-primary-dark"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/find-doctors"
            className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white px-10"
          >
            View All Doctors →
          </Link>
        </div>
      </div>
    </section>
  );
}
