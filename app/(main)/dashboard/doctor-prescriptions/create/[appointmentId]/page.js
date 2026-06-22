"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import usePageTitle from "@/hooks/usePageTitle";

export default function CreatePrescriptionPage() {
  usePageTitle("Create Prescription");
  const { appointmentId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const router = useRouter();

  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [medications, setMedications] = useState([{ name: "", dosage: "", duration: "" }]);
  const [saving, setSaving] = useState(false);

  const addMed = () => setMedications([...medications, { name: "", dosage: "", duration: "" }]);
  const removeMed = (i) => setMedications(medications.filter((_, idx) => idx !== i));
  const updateMed = (i, field, value) => {
    const updated = [...medications];
    updated[i][field] = value;
    setMedications(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!diagnosis) { toast.error("Diagnosis is required"); return; }
    setSaving(true);
    try {
      // The appointment document already contains both doctorId and patientId
      const { data: appt } = await axiosSecure.get(`/appointments/${appointmentId}`);

      await axiosSecure.post("/prescriptions", {
        doctorId: appt.doctorId,
        patientId: appt.patientId,
        appointmentId,
        diagnosis,
        medications,
        notes,
      });

      toast.success("Prescription saved");
      router.push("/dashboard/appointment-requests");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not save prescription");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">Create Prescription</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-2xl border border-primary/10 bg-white p-7 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Diagnosis *</label>
          <textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            rows={3}
            required
            placeholder="Write the patient's diagnosis..."
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-ink/70">Medications</label>
            <button type="button" onClick={addMed} className="btn btn-xs btn-outline border-primary/30 text-primary gap-1">
              <FaPlus size={10} /> Add
            </button>
          </div>
          {medications.map((med, i) => (
            <div key={i} className="mb-3 grid grid-cols-3 gap-2">
              <input value={med.name} onChange={(e) => updateMed(i, "name", e.target.value)} placeholder="Drug name" className="input input-bordered input-sm" />
              <input value={med.dosage} onChange={(e) => updateMed(i, "dosage", e.target.value)} placeholder="Dosage" className="input input-bordered input-sm" />
              <div className="flex gap-2">
                <input value={med.duration} onChange={(e) => updateMed(i, "duration", e.target.value)} placeholder="Duration" className="input input-bordered input-sm flex-1" />
                {medications.length > 1 && (
                  <button type="button" onClick={() => removeMed(i)} className="btn btn-ghost btn-xs text-error"><FaTrash size={11} /></button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Additional Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Any extra advice for the patient..."
            className="textarea textarea-bordered w-full"
          />
        </div>

        <button type="submit" disabled={saving} className="btn border-none bg-primary text-white hover:bg-primary-dark">
          {saving ? "Saving..." : "Save Prescription"}
        </button>
      </form>
    </div>
  );
}
