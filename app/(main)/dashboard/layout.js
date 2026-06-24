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

  if (roleLoading) {
    return (
      <LoadingSpinner message="Loading your dashboard..." />
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}