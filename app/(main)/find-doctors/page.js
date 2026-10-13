"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axiosPublic from "@/lib/axiosPublic";
import DoctorCard from "@/components/Doctors/DoctorCard";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import usePageTitle from "@/hooks/usePageTitle";
import SearchFilter from "@/components/Doctors/SearchFilter";

function FindDoctorsContent() {
  usePageTitle("Find Doctors");
  const searchParams = useSearchParams();

  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    specialization: searchParams.get("specialization") || "All",
    sortBy: "default",
    maxFee: "",
  });

  
  useEffect(() => {
    const spec = searchParams.get("specialization");
    if (spec) {
      setFilters((prev) => ({ ...prev, specialization: spec }));
    }
  }, [searchParams]);

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
    setPage(1);
  };

  return (
    <div className="section-padding mx-auto max-w-7xl py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-ink">
          Find Your Doctor
        </h1>
        <p className="font-body text-sm text-ink/50 mt-1">
          {filters.specialization !== "All"
            ? `Showing ${filters.specialization} specialists`
            : "Search by name or specialization, then sort to find the right fit."}
        </p>
      </div>

     
      {filters.specialization !== "All" && (
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            🔍 {filters.specialization}
            <button
              onClick={() =>
                handleFilterChange({ ...filters, specialization: "All" })
              }
              className="ml-1 text-primary/60 hover:text-primary"
            >
              ✕
            </button>
          </span>
        </div>
      )}

   
      <SearchFilter
        onFilterChange={handleFilterChange}
        initialSpecialization={filters.specialization}
      />

      
      {loading ? (
        <LoadingSpinner message="Searching doctors..." />
      ) : doctors.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-body text-ink/50">No doctors matched your search.</p>
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

export default function FindDoctorsPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading..." />}>
      <FindDoctorsContent />
    </Suspense>
  );
}
