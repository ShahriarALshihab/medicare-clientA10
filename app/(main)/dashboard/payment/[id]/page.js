"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import CheckoutForm from "@/components/Dashboard/CheckoutForm";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import usePageTitle from "@/hooks/usePageTitle";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
  usePageTitle("Complete Payment");
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/appointments/${id}`)
      .then((res) => setAppointment(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading payment details..." />;
  if (!appointment) return <p className="py-16 text-center">Appointment not found.</p>;

  if (appointment.paymentStatus === "paid") {
    return (
      <div className="py-16 text-center">
        <p className="font-display text-xl font-bold text-success">Payment already completed ✓</p>
        <p className="mt-2 font-body text-sm text-ink/60">This appointment has been paid for.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">Complete Payment</h1>
      <div className="rounded-2xl border border-primary/10 bg-white p-7 shadow-sm">
        <Elements stripe={stripePromise}>
          <CheckoutForm appointment={appointment} />
        </Elements>
      </div>
    </div>
  );
}
