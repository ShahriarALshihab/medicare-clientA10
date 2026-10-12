"use client";

import { useState } from "react";
import { HiX } from "react-icons/hi";

const CANCEL_REASONS = [
  "Schedule conflict",
  "Feeling better",
  "Found another doctor",
  "Emergency came up",
  "Financial reasons",
  "Other",
];

export default function CancelModal({ appointment, onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [loading, setLoading] = useState(false);

  const finalReason = reason === "Other" ? customReason : reason;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!finalReason.trim()) return;
    setLoading(true);
    await onConfirm(appointment._id, finalReason.trim());
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary/10">
          <h2 className="font-display text-xl font-bold text-ink">
            Cancel Appointment
          </h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-circle btn-sm"
          >
            <HiX size={20} />
          </button>
        </div>

        {/* Appointment Info */}
        <div className="mx-6 mt-4 rounded-xl bg-red-50 border border-red-100 p-4">
          <p className="text-sm font-semibold text-ink">
            {appointment?.doctorName}
          </p>
          <p className="text-xs text-ink/60 mt-0.5">
            {appointment?.appointmentDate} at {appointment?.appointmentTime}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold text-ink mb-3">
              Reason for cancellation <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-col gap-2">
              {CANCEL_REASONS.map((r) => (
                <label
                  key={r}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="reason"
                    value={r}
                    checked={reason === r}
                    onChange={() => setReason(r)}
                    className="radio radio-primary radio-sm"
                    required
                  />
                  <span className="text-sm text-ink/70 group-hover:text-ink transition-colors">
                    {r}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {reason === "Other" && (
            <textarea
              required
              rows={3}
              placeholder="Please describe your reason..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              className="textarea textarea-bordered w-full resize-none text-sm"
            />
          )}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline border-primary/30 flex-1"
            >
              Keep Appointment
            </button>
            <button
              type="submit"
              disabled={loading || !finalReason.trim()}
              className="btn border-none bg-red-500 text-white hover:bg-red-600 flex-1 disabled:opacity-60"
            >
              {loading ? "Cancelling..." : "Confirm Cancel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
