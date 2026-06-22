"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome, FaCalendarCheck, FaMoneyBillWave, FaStar, FaUser,
  FaClipboardList, FaUserClock, FaPrescriptionBottleAlt, FaUserMd,
  FaUsers, FaChartBar, FaHospitalUser, FaCreditCard,
} from "react-icons/fa";

const menus = {
  patient: [
    { href: "/dashboard", label: "Overview", icon: FaHome },
    { href: "/dashboard/my-appointments", label: "My Appointments", icon: FaCalendarCheck },
    { href: "/dashboard/payment-history", label: "Payment History", icon: FaMoneyBillWave },
    { href: "/dashboard/my-reviews", label: "My Reviews", icon: FaStar },
    { href: "/dashboard/profile", label: "My Profile", icon: FaUser },
  ],
  doctor: [
    { href: "/dashboard", label: "Overview", icon: FaHome },
    { href: "/dashboard/doctor-schedule", label: "Manage Schedule", icon: FaUserClock },
    { href: "/dashboard/appointment-requests", label: "Appointment Requests", icon: FaClipboardList },
    { href: "/dashboard/doctor-prescriptions", label: "Prescriptions", icon: FaPrescriptionBottleAlt },
    { href: "/dashboard/profile", label: "Profile Management", icon: FaUserMd },
  ],
  admin: [
    { href: "/dashboard", label: "Overview", icon: FaHome },
    { href: "/dashboard/manage-users", label: "Manage Users", icon: FaUsers },
    { href: "/dashboard/manage-doctors", label: "Manage Doctors", icon: FaHospitalUser },
    { href: "/dashboard/manage-appointments", label: "Manage Appointments", icon: FaCalendarCheck },
    { href: "/dashboard/manage-payments", label: "Payment Records", icon: FaCreditCard },
    { href: "/dashboard/analytics", label: "Analytics", icon: FaChartBar },
  ],
};

const Sidebar = ({ role }) => {
  const pathname = usePathname();
  const items = menus[role] || [];

  return (
    <aside className="w-full shrink-0 border-r border-primary/10 bg-white md:w-64">
      <div className="flex flex-col gap-1 p-4">
        <p className="mb-2 px-2 font-body text-xs font-semibold uppercase tracking-wide text-ink/40">
          {role} dashboard
        </p>
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm transition ${
                active ? "bg-primary text-white" : "text-ink/70 hover:bg-primary-light"
              }`}
            >
              <Icon size={15} /> {label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
