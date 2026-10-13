"use client";

import { useState, useEffect } from "react";
import { HiSearch, HiX } from "react-icons/hi";

const SPECIALIZATIONS = [
  "All",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "Gynecology",
  "Psychiatry",
  "Gastroenterology",
  "Ophthalmology",
  "General Medicine",
];

const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Top Rated", value: "rating" },
  { label: "Most Experienced", value: "experience" },
  { label: "Fee: Low to High", value: "fee-asc" },
  { label: "Fee: High to Low", value: "fee-desc" },
];

export default function SearchFilter({ onFilterChange, initialSpecialization = "All" }) {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState(initialSpecialization);
  const [sortBy, setSortBy] = useState("default");
  const [maxFee, setMaxFee] = useState("");

 
  useEffect(() => {
    setSpecialization(initialSpecialization);
  }, [initialSpecialization]);

  const handleChange = (updates) => {
    const newFilters = { search, specialization, sortBy, maxFee, ...updates };
    if (updates.search !== undefined) setSearch(updates.search);
    if (updates.specialization !== undefined) setSpecialization(updates.specialization);
    if (updates.sortBy !== undefined) setSortBy(updates.sortBy);
    if (updates.maxFee !== undefined) setMaxFee(updates.maxFee);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    setSearch("");
    setSpecialization("All");
    setSortBy("default");
    setMaxFee("");
    onFilterChange({ search: "", specialization: "All", sortBy: "default", maxFee: "" });
  };

  const hasActiveFilters = search || specialization !== "All" || sortBy !== "default" || maxFee;

  return (
    <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm mb-8">
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative">
          <HiSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
          <input
            type="text"
            placeholder="Search by doctor name..."
            value={search}
            onChange={(e) => handleChange({ search: e.target.value })}
            className="input input-bordered w-full pl-11"
          />
          {search && (
            <button
              onClick={() => handleChange({ search: "" })}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink"
            >
              <HiX size={16} />
            </button>
          )}
        </div>

  
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={specialization}
            onChange={(e) => handleChange({ specialization: e.target.value })}
            className="select select-bordered flex-1"
          >
            {SPECIALIZATIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => handleChange({ sortBy: e.target.value })}
            className="select select-bordered flex-1"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Max fee ($)"
            value={maxFee}
            onChange={(e) => handleChange({ maxFee: e.target.value })}
            className="input input-bordered flex-1"
            min="0"
          />
        </div>

        
        {hasActiveFilters && (
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex flex-wrap gap-2">
              {search && (
                <span className="badge badge-primary badge-outline gap-1">
                  Search: {search}
                  <button onClick={() => handleChange({ search: "" })}><HiX size={12} /></button>
                </span>
              )}
              {specialization !== "All" && (
                <span className="badge badge-primary badge-outline gap-1">
                  {specialization}
                  <button onClick={() => handleChange({ specialization: "All" })}><HiX size={12} /></button>
                </span>
              )}
              {maxFee && (
                <span className="badge badge-primary badge-outline gap-1">
                  Max: ${maxFee}
                  <button onClick={() => handleChange({ maxFee: "" })}><HiX size={12} /></button>
                </span>
              )}
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-ink/50 hover:text-primary transition-colors font-medium"
            >
              Reset all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
