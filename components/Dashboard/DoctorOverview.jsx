"use client";

import { useEffect, useState } from "react";
import { FaUsers, FaCalendarDay, FaStar } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
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

const DoctorOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure.get(`/stats/doctor/${user.email}`).then((res) => setStats(res.data));
  }, [user?.email]);

  if (!stats) return <LoadingSpinner message="Loading your overview..." />;

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">Welcome back, Dr. {user?.displayName}</h1>
      <div className="grid gap-5 sm:grid-cols-3">
        <Card icon={FaUsers} label="Total Patients" value={stats.totalPatients} />
        <Card icon={FaCalendarDay} label="Today's Appointments" value={stats.todaysAppointments} />
        <Card icon={FaStar} label="Reviews Received" value={`${stats.reviewsReceived} (${stats.ratingAverage?.toFixed(1) || 0}★)`} />
      </div>
    </div>
  );
};

export default DoctorOverview;
