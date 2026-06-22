"use client";

import RoleRoute from "@/components/Routes/RoleRoute";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import usePageTitle from "@/hooks/usePageTitle";

const StarPicker = ({ rating, setRating }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <button key={n} type="button" onClick={() => setRating(n)}>
        <FaStar className={n <= rating ? "text-amber-400" : "text-ink/20"} size={20} />
      </button>
    ))}
  </div>
);

export default function MyReviewsPage() {
  usePageTitle("My Reviews");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(5);

  const fetchReviews = () => {
    if (!user?.email) return;
    axiosSecure
      .get(`/reviews/patient/${user.email}`)
      .then((res) => setReviews(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchReviews(); }, [user?.email]);

  const openEdit = (r) => {
    setEditId(r._id);
    setEditText(r.reviewText);
    setEditRating(r.rating);
  };

  const handleUpdate = async () => {
    await axiosSecure.patch(`/reviews/${editId}`, { rating: editRating, reviewText: editText });
    toast.success("Review updated");
    setEditId(null);
    fetchReviews();
  };

  const handleDelete = async (id) => {
    const res = await Swal.fire({
      title: "Delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#D9462F",
    });
    if (!res.isConfirmed) return;
    await axiosSecure.delete(`/reviews/${id}`);
    toast.success("Review deleted");
    fetchReviews();
  };

  if (loading) return <LoadingSpinner message="Loading reviews..." />;

  return (
    <RoleRoute allowed={["patient"]}>
        <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">My Reviews</h1>

      {reviews.length === 0 ? (
        <p className="py-16 text-center font-body text-ink/50">
          You haven&apos;t reviewed any doctor yet. Reviews become available after a completed appointment.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((r) => (
            <div key={r._id} className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-body text-sm font-semibold text-ink">Doctor Review</p>
                  <div className="mt-1 flex text-amber-400">
                    {Array.from({ length: r.rating }).map((_, i) => <FaStar key={i} size={13} />)}
                  </div>
                  <p className="mt-2 font-body text-sm text-ink/60">{r.reviewText}</p>
                  <p className="mt-1 font-body text-xs text-ink/40">{new Date(r.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(r)} className="btn btn-xs btn-outline border-primary/30 text-primary">Edit</button>
                  <button onClick={() => handleDelete(r._id)} className="btn btn-xs border-none bg-error text-white">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl">
            <h2 className="mb-4 font-display text-lg font-bold text-ink">Edit Review</h2>
            <StarPicker rating={editRating} setRating={setEditRating} />
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={4}
              className="textarea textarea-bordered mt-3 w-full"
            />
            <div className="mt-4 flex gap-3">
              <button onClick={handleUpdate} className="btn flex-1 border-none bg-primary text-white">Update</button>
              <button onClick={() => setEditId(null)} className="btn btn-ghost flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </RoleRoute>
  );
}
