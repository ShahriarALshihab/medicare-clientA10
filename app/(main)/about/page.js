"use client";

import { FaUserMd, FaHospital, FaHeartbeat } from "react-icons/fa";
import usePageTitle from "@/hooks/usePageTitle";

export default function AboutPage() {
  usePageTitle("About Us");

  return (
    <div className="section-padding mx-auto max-w-5xl py-16">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-bold text-ink">About MediCare Connect</h1>
        <p className="mx-auto mt-3 max-w-2xl font-body text-ink/60">
          We built MediCare Connect to remove the friction between patients and the
          care they need — no long phone calls, no paper forms, no guesswork about
          a doctor&apos;s availability.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {[
          { icon: FaUserMd, title: "Verified Specialists", text: "Every doctor on the platform is manually reviewed before going live." },
          { icon: FaHospital, title: "Hospital Network", text: "Partnered clinics and hospitals across multiple specializations." },
          { icon: FaHeartbeat, title: "Patient First", text: "Designed around real patient feedback, not assumptions." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-primary/10 bg-white p-6 text-center shadow-sm">
            <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
              <Icon size={20} />
            </span>
            <h3 className="font-display text-base font-bold text-ink">{title}</h3>
            <p className="mt-2 font-body text-sm text-ink/60">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
