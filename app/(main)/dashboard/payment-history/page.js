"use client";

import RoleRoute from "@/components/Routes/RoleRoute";

import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import usePageTitle from "@/hooks/usePageTitle";

export default function PaymentHistoryPage() {
  usePageTitle("Payment History");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/payments/patient/${user.email}`)
      .then((res) => setPayments(res.data))
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (loading) return <LoadingSpinner message="Loading payment history..." />;

  const total = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <RoleRoute allowed={["patient"]}>
        <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">Payment History</h1>
        <div className="rounded-xl bg-primary-light px-4 py-2">
          <span className="font-body text-xs text-ink/50">Total Spent: </span>
          <span className="font-display text-lg font-bold text-primary">${total.toFixed(2)}</span>
        </div>
      </div>

      {payments.length === 0 ? (
        <p className="py-16 text-center font-body text-ink/50">No payment records found.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-primary/10 bg-white shadow-sm">
          <table className="table">
            <thead className="bg-primary-light text-ink">
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => (
                <tr key={p._id} className="hover">
                  <td className="text-xs text-ink/50">{i + 1}</td>
                  <td className="font-mono text-sm">{p.transactionId}</td>
                  <td className="font-semibold text-primary">${p.amount}</td>
                  <td className="text-sm text-ink/60">{new Date(p.paymentDate).toLocaleDateString()}</td>
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
