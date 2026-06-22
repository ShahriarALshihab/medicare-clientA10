"use client";

import RoleRoute from "@/components/Routes/RoleRoute";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import usePageTitle from "@/hooks/usePageTitle";

const STATUS_BADGE = {
  verified: "badge-success",
  pending: "badge-warning",
  rejected: "badge-error",
};

export default function ManageDoctorsPage() {
  usePageTitle("Manage Doctors");
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState({ doctors: [], total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDoctors = () => {
    setLoading(true);
    axiosSecure
      .get("/doctors/admin/all", { params: { page, limit: 10, status: filter } })
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchDoctors(); }, [page, filter]);

  const updateStatus = async (id, verificationStatus) => {
    await axiosSecure.patch(`/doctors/verify/${id}`, { verificationStatus });
    toast.success(`Doctor status set to "${verificationStatus}"`);
    fetchDoctors();
  };

  return (
    <RoleRoute allowed={["admin"]}>
        <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">Manage Doctors</h1>

      <div className="mb-5 flex gap-2">
        {["", "pending", "verified", "rejected"].map((s) => (
          <button
            key={s}
            onClick={() => { setPage(1); setFilter(s); }}
            className={`btn btn-sm capitalize ${filter === s ? "border-none bg-primary text-white" : "btn-outline border-primary/20"}`}
          >
            {s || "All"}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner message="Loading doctors..." />
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-primary/10 bg-white shadow-sm">
            <table className="table">
              <thead className="bg-primary-light text-ink">
                <tr>
                  <th>#</th>
                  <th>Doctor</th>
                  <th>Specialization</th>
                  <th>Hospital</th>
                  <th>Fee</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.doctors.map((d, i) => (
                  <tr key={d._id} className="hover">
                    <td className="text-xs text-ink/50">{i + 1}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary-light">
                          {d.profileImage && <Image src={d.profileImage} alt={d.doctorName} fill className="object-cover" />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{d.doctorName}</p>
                          <p className="text-xs text-ink/50">{d.userEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm">{d.specialization}</td>
                    <td className="text-sm text-ink/60">{d.hospitalName || "—"}</td>
                    <td className="text-sm">${d.consultationFee}</td>
                    <td>
                      <span className={`badge badge-sm capitalize ${STATUS_BADGE[d.verificationStatus]}`}>
                        {d.verificationStatus}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {d.verificationStatus !== "verified" && (
                          <button onClick={() => updateStatus(d._id, "verified")} className="btn btn-xs border-none bg-success text-white">Verify</button>
                        )}
                        {d.verificationStatus !== "rejected" && (
                          <button onClick={() => updateStatus(d._id, "rejected")} className="btn btn-xs border-none bg-error text-white">Reject</button>
                        )}
                        {d.verificationStatus === "verified" && (
                          <button onClick={() => updateStatus(d._id, "pending")} className="btn btn-xs btn-outline border-warning text-warning">Cancel Verify</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: data.totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`btn btn-sm ${page === i + 1 ? "border-none bg-primary text-white" : "btn-outline border-primary/20"}`}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
    </RoleRoute>
  );
}
