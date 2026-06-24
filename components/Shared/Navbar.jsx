"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaStethoscope } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/find-doctors", label: "Find Doctors" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogOut = async () => {
    await logOut();
    toast.success("Logged out successfully");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-white/30 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
            <FaStethoscope size={18} />
          </span>
          <span className="font-display text-lg font-bold text-ink">
            MediCare<span className="text-accent"> Connect</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium text-ink/70 transition hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link
              href="/dashboard"
              className="font-body text-sm font-medium text-ink/70 transition hover:text-primary"
            >
              Dashboard
            </Link>
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary/30 ring-offset-2">
                  <Image
                    src={
                      user.photoURL ||
                      "https://i.ibb.co/2KdcM6T/default-avatar.png"
                    }
                    alt={user.displayName || "User"}
                    width={40}
                    height={40}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-50 mt-3 w-52 rounded-xl bg-white p-2 shadow-lg"
              >
                <li className="px-3 py-1 text-xs text-ink/50">
                  {user.displayName}
                </li>
                <li>
                  <Link href="/dashboard/profile">My Profile</Link>
                </li>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>Log Out</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm font-body">
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-sm border-none bg-accent font-body text-white hover:bg-accent-dark"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-3 border-t border-primary/10 bg-white px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-body text-ink/80"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="font-body text-ink/80"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogOut}
                className="btn btn-sm bg-primary text-white"
              >
                Log Out
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="btn btn-ghost btn-sm flex-1"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="btn btn-sm flex-1 bg-accent text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
