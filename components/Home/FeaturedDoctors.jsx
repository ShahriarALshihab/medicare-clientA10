"use client";

import { useEffect, useState } from "react";
import axiosPublic from "@/lib/axiosPublic";
import DoctorCard from "@/components/Doctors/DoctorCard";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";

const FeaturedDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/doctors/featured")
      .then((res) => setDoctors(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding mx-auto max-w-7xl py-16">
      <div className="mb-10 text-center">
        <p className="font-body text-sm font-semibold uppercase tracking-wider text-primary">Top Rated</p>
        <h2 className="font-display text-3xl font-bold text-ink">Featured Doctors</h2>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching featured doctors..." />
      ) : doctors.length === 0 ? (
        <p className="text-center font-body text-ink/50">No verified doctors yet. Check back soon.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedDoctors;
