"use client";

import RoleRoute from "@/components/Routes/RoleRoute";

import { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import usePageTitle from "@/hooks/usePageTitle";

export default function ManagePaymentsPage() {
  usePageTitle("Payment Records");
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState({ payments: [], total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/payments/admin/all", { params: { page, limit: 10 } })
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [page]);

  const totalRevenue = data.payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <RoleRoute allowed={["admin"]}>
        <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">Payment Records</h1>
        <div className="rounded-xl bg-primary-light px-4 py-2">
          <span className="font-body text-xs text-ink/50">Page Revenue: </span>
          <span className="font-display text-lg font-bold text-primary">${totalRevenue.toFixed(2)}</span>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading payments..." />
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-primary/10 bg-white shadow-sm">
            <table className="table">
              <thead className="bg-primary-light text-ink">
                <tr>
                  <th>#</th>
                  <th>Transaction ID</th>
                  <th>Patient</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.payments.map((p, i) => (
                  <tr key={p._id} className="hover">
                    <td className="text-xs text-ink/50">{i + 1}</td>
                    <td className="font-mono text-xs">{p.transactionId}</td>
                    <td className="text-sm">{p.patientEmail}</td>
                    <td className="font-semibold text-primary">${p.amount}</td>
                    <td className="text-sm text-ink/60">{new Date(p.paymentDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: data.totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`btn btn-sm ${page === i + 1 ? "border-none bg-primary text-white" : "btn-outline border-primary/20"}`}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
    </RoleRoute>
  );
}
