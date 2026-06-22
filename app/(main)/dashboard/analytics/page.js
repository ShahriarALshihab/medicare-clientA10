"use client";

import RoleRoute from "@/components/Routes/RoleRoute";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import usePageTitle from "@/hooks/usePageTitle";

const PIE_COLORS = ["#0F6E64", "#F2784B", "#1E9E6B", "#D9462F", "#2D7FF2"];

export default function AnalyticsPage() {
  usePageTitle("Analytics");
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get("/stats/admin").then((res) => setStats(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner message="Loading analytics..." />;
  if (!stats) return null;

  const pieData = stats.statusBreakdown.map((s) => ({ name: s._id, value: s.count }));

  return (
    <RoleRoute allowed={["admin"]}>
        <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">Analytics</h1>

      <div className="mb-6 grid gap-5 sm:grid-cols-3">
        {[
          { label: "Total Doctors", value: stats.totalDoctors },
          { label: "Total Patients", value: stats.totalPatients },
          { label: "Total Appointments", value: stats.totalAppointments },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm text-center">
            <p className="font-display text-3xl font-extrabold text-primary">{value}</p>
            <p className="font-body text-sm text-ink/50">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Doctor Performance (Rating)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.doctorPerformance} margin={{ top: 5, right: 10, left: -10, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="doctorName" angle={-35} textAnchor="end" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => v.toFixed(2)} />
              <Bar dataKey="ratingAverage" fill="#0F6E64" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Appointment Status Breakdown</h2>
          {pieData.length === 0 ? (
            <p className="py-16 text-center text-sm text-ink/50">No appointment data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
    </RoleRoute>
  );
}
