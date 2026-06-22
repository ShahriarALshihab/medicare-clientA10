"use client";

import RoleRoute from "@/components/Routes/RoleRoute";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
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

const StarPicker = ({ rating, setRating }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <button key={n} type="button" onClick={() => setRating(n)}>
        <FaStar className={n <= rating ? "text-amber-400" : "text-ink/20"} size={22} />
      </button>
    ))}
  </div>
);

export default function MyAppointmentsPage() {
  usePageTitle("My Appointments");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reschedule state
  const [rescheduleId, setRescheduleId] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  // Add Review state
  const [reviewAppt, setReviewAppt] = useState(null); // full appointment object
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchAppointments = () => {
    if (!user?.email) return;
    setLoading(true);
    axiosSecure
      .get(`/appointments/patient/${user.email}`)
      .then((res) => setAppointments(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAppointments(); }, [user?.email]);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Cancel appointment?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
      confirmButtonColor: "#D9462F",
      cancelButtonText: "Keep it",
    });
    if (!result.isConfirmed) return;
    await axiosSecure.patch(`/appointments/cancel/${id}`);
    toast.success("Appointment cancelled");
    fetchAppointments();
  };

  const handleReschedule = async (e) => {
    e.preventDefault();
    if (!newDate || !newTime) { toast.error("Please fill in both date and time"); return; }
    await axiosSecure.patch(`/appointments/reschedule/${rescheduleId}`, {
      appointmentDate: newDate,
      appointmentTime: newTime,
    });
    toast.success("Appointment rescheduled");
    setRescheduleId(null);
    setNewDate(""); setNewTime("");
    fetchAppointments();
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) { toast.error("Please write a review"); return; }
    setSubmittingReview(true);
    try {
      // Get the doctor's _id via their profile
      const { data: doctor } = await axiosSecure.get(`/doctors/profile/${reviewAppt.doctorEmail}`);
      const { data: patient } = await axiosSecure.get(`/users/${user.email}`);

      await axiosSecure.post("/reviews", {
        patientId: patient._id,
        patientEmail: user.email,
        patientName: user.displayName,
        patientPhoto: user.photoURL || "",
        doctorId: doctor._id,
        appointmentId: reviewAppt._id,
        rating: reviewRating,
        reviewText,
      });

      toast.success("Review submitted! Thank you.");
      setReviewAppt(null);
      setReviewText("");
      setReviewRating(5);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading your appointments..." />;

  return (
    <RoleRoute allowed={["patient"]}>
        <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">My Appointments</h1>

      {appointments.length === 0 ? (
        <div className="py-16 text-center">
          <p className="mb-3 font-body text-ink/50">You have no appointments yet.</p>
          <Link href="/find-doctors" className="btn border-none bg-primary text-white">Find a Doctor</Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-primary/10 bg-white shadow-sm">
          <table className="table">
            <thead className="bg-primary-light text-ink">
              <tr>
                <th>#</th>
                <th>Doctor</th>
                <th>Date &amp; Time</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, i) => (
                <tr key={appt._id} className="hover">
                  <td className="font-body text-xs text-ink/50">{i + 1}</td>
                  <td>
                    <p className="font-semibold">{appt.doctorName}</p>
                  </td>
                  <td className="font-body text-sm">
                    {appt.appointmentDate}<br />
                    <span className="text-xs text-ink/50">{appt.appointmentTime}</span>
                  </td>
                  <td>
                    <span className={`badge badge-sm capitalize ${STATUS_COLORS[appt.appointmentStatus]}`}>
                      {appt.appointmentStatus}
                    </span>
                  </td>
                  <td>
                    {appt.paymentStatus === "paid" ? (
                      <span className="badge badge-success badge-sm">Paid</span>
                    ) : (
                      <Link href={`/dashboard/payment/${appt._id}`} className="btn btn-xs border-none bg-accent text-white">
                        Pay Now
                      </Link>
                    )}
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {appt.appointmentStatus === "pending" && (
                        <>
                          <button onClick={() => { setRescheduleId(appt._id); setNewDate(""); setNewTime(""); }} className="btn btn-xs btn-outline border-primary/30 text-primary">
                            Reschedule
                          </button>
                          <button onClick={() => handleCancel(appt._id)} className="btn btn-xs border-none bg-error text-white">
                            Cancel
                          </button>
                        </>
                      )}
                      {appt.appointmentStatus === "completed" && (
                        <>
                          <Link href={`/dashboard/view-prescription/${appt._id}`} className="btn btn-xs btn-outline border-primary/30 text-primary">
                            Prescription
                          </Link>
                          <button
                            onClick={() => { setReviewAppt(appt); setReviewRating(5); setReviewText(""); }}
                            className="btn btn-xs border-none bg-amber-400 text-white"
                          >
                            Add Review
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Reschedule modal ── */}
      {rescheduleId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <form onSubmit={handleReschedule} className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-xl">
            <h2 className="mb-4 font-display text-lg font-bold text-ink">Reschedule Appointment</h2>
            <label className="mb-1 block text-sm text-ink/60">New Day</label>
            <input type="text" value={newDate} onChange={(e) => setNewDate(e.target.value)} placeholder="e.g. Monday" className="input input-bordered mb-3 w-full" />
            <label className="mb-1 block text-sm text-ink/60">New Time Slot</label>
            <input type="text" value={newTime} onChange={(e) => setNewTime(e.target.value)} placeholder="e.g. 10:00 AM" className="input input-bordered mb-4 w-full" />
            <div className="flex gap-3">
              <button type="submit" className="btn flex-1 border-none bg-primary text-white">Confirm</button>
              <button type="button" onClick={() => setRescheduleId(null)} className="btn btn-ghost flex-1">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* ── Add Review modal ── */}
      {reviewAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <form onSubmit={handleAddReview} className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl">
            <h2 className="mb-1 font-display text-lg font-bold text-ink">Leave a Review</h2>
            <p className="mb-4 font-body text-sm text-ink/50">for {reviewAppt.doctorName}</p>
            <label className="mb-2 block text-sm font-medium text-ink/70">Your Rating</label>
            <StarPicker rating={reviewRating} setRating={setReviewRating} />
            <label className="mb-1 mt-4 block text-sm font-medium text-ink/70">Your Review</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              required
              placeholder="Share your experience with this doctor..."
              className="textarea textarea-bordered w-full"
            />
            <div className="mt-4 flex gap-3">
              <button type="submit" disabled={submittingReview} className="btn flex-1 border-none bg-primary text-white">
                {submittingReview ? "Submitting..." : "Submit Review"}
              </button>
              <button type="button" onClick={() => setReviewAppt(null)} className="btn btn-ghost flex-1">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
    </RoleRoute>
  );
}
