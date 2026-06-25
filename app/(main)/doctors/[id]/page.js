"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaStar, FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";
import toast from "react-hot-toast";
import axiosPublic from "@/lib/axiosPublic";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import usePageTitle from "@/hooks/usePageTitle";

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [booking, setBooking] = useState(false);

  usePageTitle(doctor?.doctorName || "Doctor Details");

  useEffect(() => {
    Promise.all([axiosPublic.get(`/doctors/${id}`), axiosPublic.get(`/reviews/doctor/${id}`)])
      .then(([docRes, reviewRes]) => {
        setDoctor(docRes.data);
        setReviews(reviewRes.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to book an appointment.");
      router.push("/login");
      return;
    }
    if (!selectedDay || !selectedTime) {
      toast.error("Please choose a date and time slot.");
      return;
    }

    setBooking(true);
    try {
      const { data } = await axiosSecure.post("/appointments", {
        doctorId: doctor._id,
        patientEmail: user.email,
        appointmentDate: selectedDay,
        appointmentTime: selectedTime,
        symptoms,
      });
      toast.success("Appointment created! Please complete payment to confirm.");
      router.push(`/dashboard/payment/${data._id}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading..." />;
  if (!doctor) return <p className="py-20 text-center">Doctor not found.</p>;

  return (
    <div className="section-padding mx-auto max-w-6xl py-12">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-primary-light">
            <Image
              src={doctor.profileImage || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&auto=format&fit=crop&q=60"}
              alt={doctor.doctorName}
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-5 rounded-2xl border border-primary/10 bg-white p-5">
            <h1 className="font-display text-xl font-bold text-ink">{doctor.doctorName}</h1>
            <p className="font-body text-sm font-medium text-primary">{doctor.specialization}</p>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink/60"><FaGraduationCap /> {doctor.qualifications}</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-ink/60"><FaMapMarkerAlt /> {doctor.hospitalName}</p>
            <p className="mt-3 flex items-center gap-1 text-sm font-semibold text-amber-500">
              <FaStar /> {doctor.ratingAverage?.toFixed(1) || "No ratings yet"} ({doctor.ratingCount} reviews)
            </p>
            <p className="mt-3 font-display text-lg font-bold text-ink">${doctor.consultationFee} / consultation</p>
          </div>
        </div>

        <div className="md:col-span-2">
          <form onSubmit={handleBooking} className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-display text-lg font-bold text-ink">Book an Appointment</h2>

            {doctor.availableSlots?.length === 0 ? (
              <p className="text-sm text-ink/50">This doctor hasn&apos;t published a schedule yet.</p>
            ) : (
              <>
                <label className="mb-1 block text-sm font-medium text-ink/70">Choose a day</label>
                <select
                  value={selectedDay}
                  onChange={(e) => {
                    setSelectedDay(e.target.value);
                    setSelectedTime("");
                  }}
                  className="select select-bordered mb-4 w-full"
                  required
                >
                  <option value="">Select a day</option>
                  {doctor.availableSlots?.map((slot) => (
                    <option key={slot.day} value={slot.day}>{slot.day}</option>
                  ))}
                </select>

                {selectedDay && (
                  <>
                    <label className="mb-1 block text-sm font-medium text-ink/70">Choose a time</label>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {doctor.availableSlots
                        .find((s) => s.day === selectedDay)
                        ?.times.map((time) => (
                          <button
                            type="button"
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`btn btn-sm ${selectedTime === time ? "border-none bg-primary text-white" : "btn-outline border-primary/20"}`}
                          >
                            {time}
                          </button>
                        ))}
                    </div>
                  </>
                )}
              </>
            )}

            <label className="mb-1 block text-sm font-medium text-ink/70">Symptoms (optional)</label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Briefly describe what's bothering you..."
              className="textarea textarea-bordered mb-4 w-full"
              rows={3}
            />

            <button type="submit" disabled={booking} className="btn w-full border-none bg-primary text-white hover:bg-primary-dark">
              {booking ? "Booking..." : `Book & Continue to Payment ($${doctor.consultationFee})`}
            </button>
          </form>

          <div className="mt-8">
            <h2 className="mb-4 font-display text-lg font-bold text-ink">Patient Reviews</h2>
            {reviews.length === 0 ? (
              <p className="text-sm text-ink/50">No reviews yet for this doctor.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {reviews.map((r) => (
                  <div key={r._id} className="rounded-xl border border-primary/10 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-body text-sm font-semibold text-ink">{r.patientName}</p>
                      <div className="flex text-amber-500">
                        {Array.from({ length: r.rating }).map((_, i) => <FaStar key={i} size={11} />)}
                      </div>
                    </div>
                    <p className="mt-1 font-body text-sm text-ink/60">{r.reviewText}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
