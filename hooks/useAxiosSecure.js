"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosSecure from "@/lib/axiosSecure";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          await logOut();
          router.push("/login");
        }
        return Promise.reject(error);
      },
    );

    return () => axiosSecure.interceptors.response.eject(interceptor);
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
