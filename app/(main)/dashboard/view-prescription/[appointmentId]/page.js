"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import usePageTitle from "@/hooks/usePageTitle";

export default function ViewPrescriptionPage() {
  usePageTitle("Prescription");
  const { appointmentId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/prescriptions/appointment/${appointmentId}`)
      .then((res) => setPrescription(res.data))
      .finally(() => setLoading(false));
  }, [appointmentId]);

  if (loading) return <LoadingSpinner message="Loading prescription..." />;
  if (!prescription) return <p className="py-16 text-center font-body text-ink/50">No prescription found for this appointment.</p>;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">Prescription</h1>
      <div className="rounded-2xl border border-primary/10 bg-white p-7 shadow-sm">
        <div className="mb-5 rounded-xl bg-primary-light p-4">
          <p className="font-body text-xs text-ink/50">Issued</p>
          <p className="font-body text-sm font-semibold text-ink">{new Date(prescription.createdAt).toLocaleDateString()}</p>
        </div>

        <h2 className="mb-2 font-display text-base font-bold text-ink">Diagnosis</h2>
        <p className="mb-5 font-body text-sm text-ink/70">{prescription.diagnosis}</p>

        <h2 className="mb-2 font-display text-base font-bold text-ink">Medications</h2>
        <div className="mb-5 flex flex-col gap-2">
          {prescription.medications.map((med, i) => (
            <div key={i} className="rounded-xl border border-primary/10 p-4">
              <p className="font-semibold text-ink">{med.name}</p>
              <p className="text-sm text-ink/60">Dosage: {med.dosage} · Duration: {med.duration}</p>
            </div>
          ))}
        </div>

        {prescription.notes && (
          <>
            <h2 className="mb-2 font-display text-base font-bold text-ink">Doctor Notes</h2>
            <p className="font-body text-sm text-ink/70">{prescription.notes}</p>
          </>
        )}
      </div>
    </div>
  );
}
