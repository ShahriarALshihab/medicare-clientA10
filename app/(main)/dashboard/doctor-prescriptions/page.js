"use client";

import RoleRoute from "@/components/Routes/RoleRoute";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import usePageTitle from "@/hooks/usePageTitle";

export default function DoctorPrescriptionsPage() {
  usePageTitle("Prescriptions");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ diagnosis: "", notes: "", medications: [] });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    axiosSecure
      .get(`/appointments/doctor/${user.email}`, { params: { status: "completed" } })
      .then((res) => setAppointments(res.data))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const openEdit = async (appointmentId) => {
    const { data } = await axiosSecure.get(`/prescriptions/appointment/${appointmentId}`);
    if (!data) { toast.error("No prescription found for this appointment"); return; }
    setEditId(data._id);
    setEditData({ diagnosis: data.diagnosis, notes: data.notes, medications: data.medications });
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await axiosSecure.patch(`/prescriptions/${editId}`, editData);
      toast.success("Prescription updated");
      setEditId(null);
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading prescriptions..." />;

  return (
    <RoleRoute allowed={["doctor"]}>
        <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">Prescription Management</h1>
      <p className="mb-4 text-sm text-ink/50">These are your completed appointments. Click the edit icon to update a prescription, or create one if it doesn&apos;t exist yet.</p>

      {appointments.length === 0 ? (
        <p className="py-16 text-center text-ink/50">No completed appointments yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-primary/10 bg-white shadow-sm">
          <table className="table">
            <thead className="bg-primary-light text-ink">
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Date</th>
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
                  <td className="text-sm">{appt.appointmentDate} · {appt.appointmentTime}</td>
                  <td className="flex gap-2">
                    <button onClick={() => openEdit(appt._id)} className="btn btn-xs btn-outline border-primary/30 text-primary gap-1">
                      <FaEdit size={11} /> Edit Prescription
                    </button>
                    <Link href={`/dashboard/doctor-prescriptions/create/${appt._id}`} className="btn btn-xs border-none bg-primary text-white">
                      New Prescription
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 px-4">
          <div className="my-4 w-full max-w-lg rounded-2xl bg-white p-7 shadow-xl">
            <h2 className="mb-4 font-display text-lg font-bold text-ink">Edit Prescription</h2>
            <label className="mb-1 block text-sm text-ink/60">Diagnosis</label>
            <textarea rows={3} value={editData.diagnosis} onChange={(e) => setEditData({ ...editData, diagnosis: e.target.value })} className="textarea textarea-bordered mb-3 w-full" />
            <label className="mb-1 block text-sm text-ink/60">Notes</label>
            <textarea rows={2} value={editData.notes} onChange={(e) => setEditData({ ...editData, notes: e.target.value })} className="textarea textarea-bordered mb-3 w-full" />
            <div className="mt-4 flex gap-3">
              <button onClick={handleUpdate} disabled={saving} className="btn flex-1 border-none bg-primary text-white">
                {saving ? "Saving..." : "Update"}
              </button>
              <button onClick={() => setEditId(null)} className="btn btn-ghost flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </RoleRoute>
  );
}
