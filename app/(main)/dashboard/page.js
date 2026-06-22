"use client";

import useRole from "@/hooks/useRole";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import PatientOverview from "@/components/Dashboard/PatientOverview";
import DoctorOverview from "@/components/Dashboard/DoctorOverview";
import AdminOverview from "@/components/Dashboard/AdminOverview";
import usePageTitle from "@/hooks/usePageTitle";

export default function DashboardOverviewPage() {
  usePageTitle("Dashboard");
  const { role, roleLoading } = useRole();

  if (roleLoading) return <LoadingSpinner message="Loading dashboard..." />;
  if (role === "doctor") return <DoctorOverview />;
  if (role === "admin") return <AdminOverview />;
  return <PatientOverview />;
}
