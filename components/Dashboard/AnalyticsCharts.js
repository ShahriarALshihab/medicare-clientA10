"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
  LineChart, Line,
} from "recharts";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";

const COLORS = ["#00a882", "#0066cc", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function AnalyticsCharts() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/stats?email=${user?.email}`
        );
        setStats(data);
      } catch {
        // use mock data if API not ready
        setStats(mockStats);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  const statusData = [
    { name: "Pending", value: stats?.pending || 0 },
    { name: "Confirmed", value: stats?.confirmed || 0 },
    { name: "Completed", value: stats?.completed || 0 },
    { name: "Cancelled", value: stats?.cancelled || 0 },
  ].filter((d) => d.value > 0);

  const monthlyData = stats?.monthly || [];
  const specialtyData = stats?.bySpecialty || [];

  return (
    <div className="flex flex-col gap-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Bookings", value: stats?.total || 0, icon: "📅", color: "bg-blue-50 text-blue-600" },
          { label: "Confirmed", value: stats?.confirmed || 0, icon: "✅", color: "bg-green-50 text-green-600" },
          { label: "Pending", value: stats?.pending || 0, icon: "⏳", color: "bg-amber-50 text-amber-600" },
          { label: "Cancelled", value: stats?.cancelled || 0, icon: "❌", color: "bg-red-50 text-red-600" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm"
          >
            <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center text-xl mb-3`}>
              {card.icon}
            </div>
            <p className="font-display text-2xl font-bold text-ink">{card.value}</p>
            <p className="text-xs text-ink/50 mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Appointments Bar Chart */}
        <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
          <h3 className="font-display font-bold text-ink mb-4">
            Monthly Appointments
          </h3>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0faf8" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e6f7f3" }}
                />
                <Bar dataKey="count" fill="#00a882" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-48 text-ink/30">
              <p>No data yet</p>
            </div>
          )}
        </div>

        {/* Status Pie Chart */}
        <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
          <h3 className="font-display font-bold text-ink mb-4">
            Appointment Status
          </h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e6f7f3" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-48 text-ink/30">
              <p>No data yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Specialty Bar Chart */}
      {specialtyData.length > 0 && (
        <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
          <h3 className="font-display font-bold text-ink mb-4">
            Appointments by Specialty
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={specialtyData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0faf8" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="specialty" type="category" tick={{ fontSize: 12 }} width={120} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #e6f7f3" }}
              />
              <Bar dataKey="count" fill="#0066cc" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

// Mock data for when API is not ready
const mockStats = {
  total: 12,
  confirmed: 5,
  pending: 4,
  completed: 2,
  cancelled: 1,
  monthly: [
    { month: "Jun", count: 2 },
    { month: "Jul", count: 4 },
    { month: "Aug", count: 3 },
    { month: "Sep", count: 5 },
    { month: "Oct", count: 6 },
  ],
  bySpecialty: [
    { specialty: "Cardiology", count: 4 },
    { specialty: "Neurology", count: 3 },
    { specialty: "Pediatrics", count: 2 },
    { specialty: "Dermatology", count: 3 },
  ],
};
