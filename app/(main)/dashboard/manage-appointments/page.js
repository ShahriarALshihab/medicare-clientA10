"use client";

import RoleRoute from "@/components/Routes/RoleRoute";

import { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import usePageTitle from "@/hooks/usePageTitle";

const STATUS_COLORS = {
  pending: "badge-warning",
  accepted: "badge-success",
  rejected: "badge-error",
  completed: "badge-info",
  cancelled: "badge-ghost",
};

export default function ManageAppointmentsPage() {
  usePageTitle("Manage Appointments");
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState({ appointments: [], total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/appointments/admin/all", { params: { page, limit: 10, status } })
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [page, status]);

  return (
    <RoleRoute allowed={["admin"]}>
        <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">Manage Appointments</h1>

      <div className="mb-5 flex flex-wrap gap-2">
        {["", "pending", "accepted", "completed", "rejected", "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => { setPage(1); setStatus(s); }}
            className={`btn btn-sm capitalize ${status === s ? "border-none bg-primary text-white" : "btn-outline border-primary/20"}`}
          >
            {s || "All"}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner message="Loading appointments..." />
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-primary/10 bg-white shadow-sm">
            <table className="table">
              <thead className="bg-primary-light text-ink">
                <tr>
                  <th>#</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date &amp; Time</th>
                  <th>Fee</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.appointments.map((appt, i) => (
                  <tr key={appt._id} className="hover">
                    <td className="text-xs text-ink/50">{i + 1}</td>
                    <td className="text-sm">{appt.patientName}</td>
                    <td className="text-sm">{appt.doctorName}</td>
                    <td className="text-sm">{appt.appointmentDate} · {appt.appointmentTime}</td>
                    <td className="text-sm">${appt.fee}</td>
                    <td>
                      <span className={`badge badge-sm ${appt.paymentStatus === "paid" ? "badge-success" : "badge-warning"}`}>
                        {appt.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-sm capitalize ${STATUS_COLORS[appt.appointmentStatus]}`}>
                        {appt.appointmentStatus}
                      </span>
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
