"use client";

import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

// Returns { role, status, roleLoading } for the currently logged-in user.
// Useful for showing/hiding dashboard menu items and guarding routes.
const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [status, setStatus] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!user?.email || loading) {
      setRoleLoading(loading);
      return;
    }

    setRoleLoading(true);
    axiosSecure
      .get(`/users/role/${user.email}`)
      .then((res) => {
        setRole(res.data.role);
        setStatus(res.data.status);
      })
      .finally(() => setRoleLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email, loading]);

  return { role, status, roleLoading };
};

export default useRole;
