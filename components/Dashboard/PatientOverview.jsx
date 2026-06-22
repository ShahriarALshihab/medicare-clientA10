"use client";

import { useEffect, useState } from "react";
import { FaCalendarCheck, FaHistory, FaMoneyBillWave, FaHeart } from "react-icons/fa";
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

const PatientOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure.get(`/stats/patient/${user.email}`).then((res) => setStats(res.data));
  }, [user?.email]);

  if (!stats) return <LoadingSpinner message="Loading your overview..." />;

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">Welcome back, {user?.displayName}</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card icon={FaCalendarCheck} label="Upcoming Appointments" value={stats.upcomingAppointments} />
        <Card icon={FaHistory} label="Appointment History" value={stats.appointmentHistory} />
        <Card icon={FaMoneyBillWave} label="Total Payments" value={`$${stats.totalPayments}`} />
        <Card icon={FaHeart} label="Favorite Doctors" value={stats.favoriteDoctors?.length || 0} />
      </div>

      {stats.favoriteDoctors?.length > 0 && (
        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6">
          <h2 className="mb-3 font-display text-base font-bold text-ink">Your Most-Visited Doctors</h2>
          <ul className="flex flex-col gap-2">
            {stats.favoriteDoctors.map((d) => (
              <li key={d.name} className="flex justify-between font-body text-sm text-ink/70">
                <span>{d.name}</span>
                <span className="font-semibold text-primary">{d.count} visits</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatientOverview;
