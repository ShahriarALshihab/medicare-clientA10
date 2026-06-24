"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== "/login") {
      router.replace("/login");
    }
  }, [loading, user, pathname, router]);

  if (loading) {
    return <LoadingSpinner message="Checking your session..." />;
  }

  if (!user) {
    return null;
  }

  return children;
};

export default PrivateRoute;