"use client";

import PrivateRoute from "@/components/Routes/PrivateRoute";
import Sidebar from "@/components/Dashboard/Sidebar";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import useRole from "@/hooks/useRole";

export default function DashboardLayout({ children }) {
  return (
    <PrivateRoute>
      <DashboardShell>{children}</DashboardShell>
    </PrivateRoute>
  );
}

function DashboardShell({ children }) {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <LoadingSpinner message="Loading your dashboard..." />;

  return (
    <div className="flex min-h-[80vh] w-full flex-col md:flex-row">
      <Sidebar role={role} />
      <div className="flex-1 bg-primary-light/40 p-5 md:p-8">{children}</div>
    </div>
  );
}
