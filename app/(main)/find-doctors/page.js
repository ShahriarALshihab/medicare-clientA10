"use client";

import { useEffect, useState } from "react";
import axiosPublic from "@/lib/axiosPublic";
import DoctorCard from "@/components/Doctors/DoctorCard";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import usePageTitle from "@/hooks/usePageTitle";
import SearchFilter from "@/components/Doctors/SearchFilter";

export default function FindDoctorsPage() {
  usePageTitle("Find Doctors");

  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    specialization: "All",
    sortBy: "default",
    maxFee: "",
  });

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get("/doctors", {
        params: {
          search: filters.search,
          sortBy: filters.sortBy,
          specialization:
            filters.specialization === "All" ? "" : filters.specialization,
          maxFee: filters.maxFee,
          page,
          limit: 6,
        },
      })
      .then((res) => {
        setDoctors(res.data.doctors);
        setTotalPages(res.data.totalPages || 1);
      })
      .finally(() => setLoading(false));
  }, [filters, page]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // reset to page 1 on filter change
  };

  return (
    <div className="section-padding mx-auto max-w-7xl py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-ink">
          Find Your Doctor
        </h1>
        <p className="font-body text-sm text-ink/50">
          Search by name or specialization, then sort to find the right fit.
        </p>
      </div>

      {/* SearchFilter Component */}
      <SearchFilter onFilterChange={handleFilterChange} />

      {/* Results */}
      {loading ? (
        <LoadingSpinner message="Searching doctors..." />
      ) : doctors.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-body text-ink/50">
            No doctors matched your search.
          </p>
          <button
            onClick={() =>
              handleFilterChange({
                search: "",
                specialization: "All",
                sortBy: "default",
                maxFee: "",
              })
            }
            className="btn btn-sm btn-outline border-primary/30 mt-4"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn btn-sm ${
                page === i + 1
                  ? "border-none bg-primary text-white"
                  : "btn-outline border-primary/20"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
