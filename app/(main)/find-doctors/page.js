"use client";

import { useEffect, useState } from "react";
import axiosPublic from "@/lib/axiosPublic";
import DoctorCard from "@/components/Doctors/DoctorCard";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import usePageTitle from "@/hooks/usePageTitle";

export default function FindDoctorsPage() {
  usePageTitle("Find Doctors");

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get("/doctors", { params: { search, sortBy, page, limit: 6 } })
      .then((res) => {
        setDoctors(res.data.doctors);
        setTotalPages(res.data.totalPages || 1);
      })
      .finally(() => setLoading(false));
  }, [search, sortBy, page]);

  return (
    <div className="section-padding mx-auto max-w-7xl py-12">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-ink">Find Your Doctor</h1>
        <p className="font-body text-sm text-ink/50">Search by name or specialization, then sort to find the right fit.</p>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          placeholder="Search by doctor name or specialization..."
          className="input input-bordered w-full max-w-md"
        />
        <select
          value={sortBy}
          onChange={(e) => {
            setPage(1);
            setSortBy(e.target.value);
          }}
          className="select select-bordered"
        >
          <option value="">Sort by</option>
          <option value="fee">Consultation Fee (low to high)</option>
          <option value="experience">Experience (most)</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>

      {loading ? (
        <LoadingSpinner message="Searching doctors..." />
      ) : doctors.length === 0 ? (
        <p className="py-10 text-center font-body text-ink/50">No doctors matched your search.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn btn-sm ${page === i + 1 ? "border-none bg-primary text-white" : "btn-outline border-primary/20"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
