"use client";

import RoleRoute from "@/components/Routes/RoleRoute";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaPlus, FaTrash } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import usePageTitle from "@/hooks/usePageTitle";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DEFAULT_TIMES = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"];

export default function DoctorSchedulePage() {
  usePageTitle("Manage Schedule");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newDay, setNewDay] = useState("");
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [adding, setAdding] = useState(false);

  const fetchDoctor = () => {
    if (!user?.email) return;
    setLoading(true);
    axiosSecure
      .get(`/doctors/profile/${user.email}`)
      .then((res) => setDoctor(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchDoctor(); }, [user?.email]);

  const toggleTime = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleAddSchedule = async () => {
    if (!newDay || selectedTimes.length === 0) {
      toast.error("Please select a day and at least one time slot.");
      return;
    }
    if (doctor.availableSlots?.some((s) => s.day === newDay)) {
      toast.error(`${newDay} already exists. Remove it first or update it.`);
      return;
    }
    setAdding(true);
    await axiosSecure.post(`/doctors/schedule/${user.email}`, { day: newDay, times: selectedTimes });
    toast.success("Schedule added");
    setNewDay(""); setSelectedTimes([]);
    fetchDoctor();
    setAdding(false);
  };

  const handleRemoveDay = async (day) => {
    const res = await Swal.fire({
      title: `Remove ${day}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D9462F",
      confirmButtonText: "Remove",
    });
    if (!res.isConfirmed) return;
    await axiosSecure.delete(`/doctors/schedule/${user.email}/${day}`);
    toast.success("Day removed");
    fetchDoctor();
  };

  if (loading) return <LoadingSpinner message="Loading schedule..." />;

  return (
    <RoleRoute allowed={["doctor"]}>
        <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">Manage Schedule</h1>

      <div className="mb-8 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display text-base font-bold text-ink">Add Availability</h2>

        <label className="mb-1 block text-sm text-ink/60">Select Day</label>
        <select value={newDay} onChange={(e) => setNewDay(e.target.value)} className="select select-bordered mb-4 w-full">
          <option value="">Choose a day</option>
          {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>

        <label className="mb-2 block text-sm text-ink/60">Select Time Slots</label>
        <div className="mb-4 flex flex-wrap gap-2">
          {DEFAULT_TIMES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggleTime(t)}
              className={`btn btn-xs ${selectedTimes.includes(t) ? "border-none bg-primary text-white" : "btn-outline border-primary/20"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <button onClick={handleAddSchedule} disabled={adding} className="btn border-none bg-primary text-white gap-2">
          <FaPlus /> {adding ? "Adding..." : "Add to Schedule"}
        </button>
      </div>

      <h2 className="mb-3 font-display text-base font-bold text-ink">Current Schedule</h2>
      {!doctor?.availableSlots?.length ? (
        <p className="text-sm text-ink/50">No schedule set yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {doctor.availableSlots.map((slot) => (
            <div key={slot.day} className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-display text-base font-bold text-ink">{slot.day}</p>
                <button onClick={() => handleRemoveDay(slot.day)} className="btn btn-ghost btn-xs text-error">
                  <FaTrash size={12} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {slot.times.map((t) => (
                  <span key={t} className="badge badge-sm border-primary/20 bg-primary-light text-ink">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </RoleRoute>
  );
}
