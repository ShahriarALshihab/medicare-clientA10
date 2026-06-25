"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import usePageTitle from "@/hooks/usePageTitle";
import axios from "axios";

const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;

export default function RegisterPage() {
  usePageTitle("Register");
  const { registerUser } = useAuth();
  const router = useRouter();

  const [role, setRole] = useState("patient");
  const [photo, setPhoto] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        formData,
      );
      setPhoto(data.data.url);
      toast.success("Photo uploaded");
    } catch (err) {
      toast.error(
        "Photo upload failed. You can also paste an image URL instead.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoUrl = photo || form.photoUrl?.value || "";

    if (!PASSWORD_REGEX.test(password)) {
      setError(
        "Password must be at least 6 characters and include one number and one special character.",
      );
      return;
    }

    const extraDoctorFields =
      role === "doctor"
        ? {
            role: "doctor",
            specialization: form.specialization.value,
            qualifications: form.qualifications.value,
            experience: Number(form.experience.value) || 0,
            consultationFee: Number(form.consultationFee.value) || 0,
            hospitalName: form.hospitalName.value,
          }
        : { role: "patient" };

    setSubmitting(true);
    try {
      await registerUser(name, email, password, photoUrl, extraDoctorFields);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6 px-4 py-14">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-ink">
          Create your account
        </h1>
        <p className="font-body text-sm text-ink/50">
          Join MediCare Connect as a patient or doctor
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-white p-7 shadow-sm"
      >
        <div className="flex gap-3">
          {["patient", "doctor"].map((r) => (
            <button
              type="button"
              key={r}
              onClick={() => setRole(r)}
              className={`btn btn-sm flex-1 capitalize ${role === r ? "border-none bg-primary text-white" : "btn-outline border-primary/30 text-ink/60"}`}
            >
              {r}
            </button>
          ))}
        </div>

        <input
          name="name"
          type="text"
          required
          placeholder="Full Name"
          className="input input-bordered w-full"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email Address"
          className="input input-bordered w-full"
        />

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="file-input file-input-bordered w-full"
          />

          {uploading && <p className="mt-1 text-xs text-ink/50">...</p>}
        </div>

        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="input input-bordered w-full"
        />
        <p className="text-xs text-ink/40">
          At least 6 characters, one number, one special character.
        </p>

        {role === "doctor" && (
          <div className="flex flex-col gap-3 rounded-xl bg-primary-light p-4">
            <p className="font-body text-xs font-semibold text-primary">
              Doctor profile details
            </p>
            <input
              name="specialization"
              required
              placeholder="Specialization (e.g. Cardiology)"
              className="input input-bordered input-sm w-full"
            />
            <input
              name="qualifications"
              placeholder="Qualifications"
              className="input input-bordered input-sm w-full"
            />
            <div className="flex gap-3">
              <input
                name="experience"
                type="number"
                min="0"
                placeholder="Years of experience"
                className="input input-bordered input-sm w-full"
              />
              <input
                name="consultationFee"
                type="number"
                min="0"
                required
                placeholder="Consultation fee"
                className="input input-bordered input-sm w-full"
              />
            </div>
            <input
              name="hospitalName"
              placeholder="Hospital / Clinic name"
              className="input input-bordered input-sm w-full"
            />
            <p className="text-xs text-ink/50">
              An admin must verify your profile before it appears publicly.
            </p>
          </div>
        )}

        {error && <p className="text-sm text-error">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="btn border-none bg-primary text-white hover:bg-primary-dark"
        >
          {submitting ? "Creating account..." : "Register"}
        </button>

        <p className="text-center text-sm text-ink/60">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
