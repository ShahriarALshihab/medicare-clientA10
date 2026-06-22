"use client";

import RoleRoute from "@/components/Routes/RoleRoute";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
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

export default function AppointmentRequestsPage() {
  usePageTitle("Appointment Requests");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = () => {
    if (!user?.email) return;
    setLoading(true);
    axiosSecure
      .get(`/appointments/doctor/${user.email}`)
      .then((res) => setAppointments(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAppointments();
  }, [user?.email]);

  const updateStatus = async (id, appointmentStatus) => {
    await axiosSecure.patch(`/appointments/status/${id}`, {
      appointmentStatus,
    });
    toast.success(`Appointment ${appointmentStatus}`);
    if (appointmentStatus === "completed") {
      router.push(`/dashboard/doctor-prescriptions/create/${id}`);
    } else {
      fetchAppointments();
    }
  };

  if (loading)
    return <LoadingSpinner message="Loading appointment requests..." />;

  return (
    <RoleRoute allowed={["doctor"]}>
      <div>
        <h1 className="mb-6 font-display text-2xl font-bold text-ink">
          Appointment Requests
        </h1>

        {appointments.length === 0 ? (
          <p className="py-16 text-center font-body text-ink/50">
            No appointment requests yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-primary/10 bg-white shadow-sm">
            <table className="table">
              <thead className="bg-primary-light text-ink">
                <tr>
                  <th>#</th>
                  <th>Patient</th>
                  <th>Date &amp; Time</th>
                  <th>Symptoms</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt, i) => (
                  <tr key={appt._id} className="hover">
                    <td className="text-xs text-ink/50">{i + 1}</td>
                    <td>
                      <p className="font-semibold">{appt.patientName}</p>
                      <p className="text-xs text-ink/50">{appt.patientEmail}</p>
                    </td>
                    <td className="text-sm">
                      {appt.appointmentDate}
                      <br />
                      <span className="text-xs text-ink/50">
                        {appt.appointmentTime}
                      </span>
                    </td>
                    <td className="max-w-[150px] truncate text-sm text-ink/60">
                      {appt.symptoms || "—"}
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm ${appt.paymentStatus === "paid" ? "badge-success" : "badge-warning"}`}
                      >
                        {appt.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm capitalize ${STATUS_COLORS[appt.appointmentStatus]}`}
                      >
                        {appt.appointmentStatus}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {appt.appointmentStatus === "pending" && (
                          <>
                            <button
                              onClick={() => updateStatus(appt._id, "accepted")}
                              className="btn btn-xs border-none bg-success text-white"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => updateStatus(appt._id, "rejected")}
                              className="btn btn-xs border-none bg-error text-white"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {appt.appointmentStatus === "accepted" && (
                          <button
                            onClick={() => updateStatus(appt._id, "completed")}
                            className="btn btn-xs border-none bg-primary text-white"
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </RoleRoute>
  );
}
