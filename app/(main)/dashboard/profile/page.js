"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import usePageTitle from "@/hooks/usePageTitle";

export default function ProfilePage() {
  usePageTitle("My Profile");
  const { user } = useAuth();
  const { role, roleLoading } = useRole();
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState(null);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure.get(`/users/${user.email}`).then((res) => setProfile(res.data));
    if (role === "doctor") {
      axiosSecure.get(`/doctors/profile/${user.email}`).then((res) => setDoctorProfile(res.data)).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email, role]);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        formData
      );
      setProfile((p) => ({ ...p, photo: data.data.url }));
      toast.success("Photo uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const form = e.target;
      await axiosSecure.patch(`/users/${user.email}`, {
        name: form.name.value,
        photo: profile.photo,
        phone: form.phone.value,
        gender: form.gender.value,
      });

      if (role === "doctor") {
        await axiosSecure.patch(`/doctors/profile/${user.email}`, {
          qualifications: form.qualifications.value,
          experience: Number(form.experience.value),
          consultationFee: Number(form.consultationFee.value),
          hospitalName: form.hospitalName.value,
          specialization: form.specialization.value,
          profileImage: profile.photo,
        });
      }

      toast.success("Profile updated");
    } catch {
      toast.error("Could not update profile");
    } finally {
      setSaving(false);
    }
  };

  if (roleLoading || !profile) return <LoadingSpinner message="Loading profile..." />;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">My Profile</h1>

      <form onSubmit={handleSave} className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-white p-7 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Profile Photo</label>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="file-input file-input-bordered w-full" />
          {uploading && <p className="mt-1 text-xs text-ink/50">Uploading...</p>}
        </div>

        <input name="name" defaultValue={profile.name} placeholder="Full Name" className="input input-bordered w-full" />
        <input value={profile.email} disabled className="input input-bordered w-full opacity-60" />
        <input name="phone" defaultValue={profile.phone} placeholder="Phone Number" className="input input-bordered w-full" />
        <select name="gender" defaultValue={profile.gender} className="select select-bordered w-full">
          <option value="">Select gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>

        {role === "doctor" && doctorProfile && (
          <div className="flex flex-col gap-3 rounded-xl bg-primary-light p-4">
            <p className="font-body text-xs font-semibold text-primary">Doctor profile details</p>
            <input name="specialization" defaultValue={doctorProfile.specialization} placeholder="Specialization" className="input input-bordered input-sm w-full" />
            <input name="qualifications" defaultValue={doctorProfile.qualifications} placeholder="Qualifications" className="input input-bordered input-sm w-full" />
            <div className="flex gap-3">
              <input name="experience" type="number" defaultValue={doctorProfile.experience} placeholder="Years of experience" className="input input-bordered input-sm w-full" />
              <input name="consultationFee" type="number" defaultValue={doctorProfile.consultationFee} placeholder="Consultation fee" className="input input-bordered input-sm w-full" />
            </div>
            <input name="hospitalName" defaultValue={doctorProfile.hospitalName} placeholder="Hospital name" className="input input-bordered input-sm w-full" />
            <p className="text-xs text-ink/50">
              Verification status: <span className="font-semibold capitalize">{doctorProfile.verificationStatus}</span>
            </p>
          </div>
        )}

        <button type="submit" disabled={saving} className="btn border-none bg-primary text-white hover:bg-primary-dark">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
