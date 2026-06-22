"use client";

import RoleRoute from "@/components/Routes/RoleRoute";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import usePageTitle from "@/hooks/usePageTitle";

export default function ManageUsersPage() {
  usePageTitle("Manage Users");
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState({ users: [], total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true);
    axiosSecure
      .get("/users", { params: { page, limit: 10, search } })
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, [page, search]);

  const toggleStatus = async (user) => {
    const newStatus = user.status === "active" ? "suspended" : "active";
    await axiosSecure.patch(`/users/status/${user._id}`, { status: newStatus });
    toast.success(`User ${newStatus}`);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    const res = await Swal.fire({
      title: "Delete this user?",
      text: "This is permanent.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D9462F",
      confirmButtonText: "Delete",
    });
    if (!res.isConfirmed) return;
    await axiosSecure.delete(`/users/${id}`);
    toast.success("User deleted");
    fetchUsers();
  };

  return (
    <RoleRoute allowed={["admin"]}>
        <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">Manage Users</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => { setPage(1); setSearch(e.target.value); }}
        placeholder="Search by name or email..."
        className="input input-bordered mb-5 w-full max-w-md"
      />

      {loading ? (
        <LoadingSpinner message="Loading users..." />
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-primary/10 bg-white shadow-sm">
            <table className="table">
              <thead className="bg-primary-light text-ink">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((u, i) => (
                  <tr key={u._id} className="hover">
                    <td className="text-xs text-ink/50">{i + 1}</td>
                    <td className="font-semibold">{u.name}</td>
                    <td className="text-sm text-ink/70">{u.email}</td>
                    <td><span className="badge badge-sm capitalize">{u.role}</span></td>
                    <td>
                      <span className={`badge badge-sm ${u.status === "active" ? "badge-success" : "badge-error"}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="flex gap-2">
                      <button
                        onClick={() => toggleStatus(u)}
                        className={`btn btn-xs ${u.status === "active" ? "border-warning text-warning btn-outline" : "border-success text-success btn-outline"}`}
                      >
                        {u.status === "active" ? "Suspend" : "Activate"}
                      </button>
                      <button onClick={() => handleDelete(u._id)} className="btn btn-xs border-none bg-error text-white">
                        Delete
                      </button>
                    </td>
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
