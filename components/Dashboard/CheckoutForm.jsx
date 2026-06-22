"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CheckoutForm = ({ appointment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setError("");

    try {
      const { data } = await axiosSecure.post("/payments/create-payment-intent", {
        fee: appointment.fee,
      });

      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: { name: user?.displayName, email: user?.email },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        await axiosSecure.post("/payments", {
          appointmentId: appointment._id,
          patientId: appointment.patientId,
          patientEmail: appointment.patientEmail,
          doctorId: appointment.doctorId,
          amount: appointment.fee,
          transactionId: paymentIntent.id,
        });
        toast.success("Payment successful!");
        router.push("/dashboard/my-appointments");
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="rounded-xl border border-primary/10 bg-primary-light p-4">
        <p className="mb-1 font-body text-xs text-ink/50">Appointment with</p>
        <p className="font-display text-base font-bold text-ink">{appointment.doctorName}</p>
        <p className="font-body text-sm text-ink/60">{appointment.appointmentDate} · {appointment.appointmentTime}</p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink/70">Card Details</label>
        <div className="rounded-xl border border-primary/20 p-4">
          <CardElement options={{ style: { base: { fontSize: "15px", color: "#102A28" } } }} />
        </div>
        {/* Test card: 4242 4242 4242 4242 · any future date · any CVC */}
        <p className="mt-1 text-xs text-ink/40">Test card: 4242 4242 4242 4242 · 12/34 · 123</p>
      </div>

      {error && <p className="text-sm text-error">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn border-none bg-primary text-white hover:bg-primary-dark"
      >
        {processing ? "Processing..." : `Pay $${appointment.fee}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
