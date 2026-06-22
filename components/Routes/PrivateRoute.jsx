"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useRole from "@/hooks/useRole";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import PrivateRoute from "./PrivateRoute";

// Usage: <RoleRoute allowed={["admin"]}>...</RoleRoute>
const RoleRoute = ({ children, allowed = [] }) => {
  const { role, roleLoading } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!roleLoading && role && !allowed.includes(role)) {
      router.push("/dashboard");
    }
  }, [roleLoading, role, allowed, router]);

  return (
    <PrivateRoute>
      {roleLoading || !role || !allowed.includes(role) ? (
        <LoadingSpinner message="Checking permissions..." />
      ) : (
        children
      )}
    </PrivateRoute>
  );
};

export default RoleRoute;
