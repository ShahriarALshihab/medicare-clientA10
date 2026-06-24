"use client";

import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState(null);
  const [status, setStatus] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    console.log("useRole fired:", user?.email);

    if (loading) {
      setRoleLoading(true);
      return;
    }

    if (!user?.email) {
      setRole(null);
      setStatus(null);
      setRoleLoading(false);
      return;
    }

    setRoleLoading(true);

    axiosSecure
      .get(`/users/role/${user.email}`)
      .then((res) => {
        console.log("ROLE SUCCESS:", res.data);

        setRole(res.data.role);
        setStatus(res.data.status);
      })
      .catch((err) => {
        console.error("ROLE ERROR:", err);

        setRole(null);
        setStatus(null);
      })
      .finally(() => {
        console.log("ROLE FINISHED");

        setRoleLoading(false);
      });
  }, [user?.email, loading, axiosSecure]);

  return {
    role,
    status,
    roleLoading,
  };
};

export default useRole;
