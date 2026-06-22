"use client";

import { useEffect, useState } from "react";
import { FaUserMd, FaUsers, FaCalendarCheck } from "react-icons/fa";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";

const Card = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
      <Icon size={18} />
    </span>
    <div>
      <p className="font-display text-2xl font-bold text-ink">{value}</p>
      <p className="font-body text-xs text-ink/50">{label}</p>
    </div>
  </div>
);

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosSecure.get("/stats/admin").then((res) => setStats(res.data));
  }, []);

  if (!stats) return <LoadingSpinner message="Loading platform overview..." />;

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">Platform Overview</h1>
      <div className="grid gap-5 sm:grid-cols-3">
        <Card icon={FaUserMd} label="Total Doctors" value={stats.totalDoctors} />
        <Card icon={FaUsers} label="Total Patients" value={stats.totalPatients} />
        <Card icon={FaCalendarCheck} label="Total Appointments" value={stats.totalAppointments} />
      </div>
      <p className="mt-6 font-body text-sm text-ink/50">
        Visit the <span className="font-semibold text-primary">Analytics</span> tab for doctor
        performance charts and appointment status breakdowns.
      </p>
    </div>
  );
};

export default AdminOverview;
