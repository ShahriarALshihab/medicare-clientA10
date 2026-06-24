import Link from "next/link";
import {
  FaStethoscope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-20 bg-ink text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-8">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
              <FaStethoscope size={18} />
            </span>
            <span className="font-display text-lg font-bold text-white">
              MediCare<span className="text-accent"> Connect</span>
            </span>
          </div>
          <p className="font-body text-sm text-white/60">
            Connecting patients and doctors through a single, secure healthcare
            platform.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-white">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2 font-body text-sm text-white/60">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/find-doctors">Find Doctors</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-white">
            Contact
          </h4>
          <ul className="flex flex-col gap-2 font-body text-sm text-white/60">
            <li>support@medicareconnect.com</li>
            <li>+8801777111111</li>
            <li>24/7 Care Avenue, Dhaka</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-white">
            Emergency Hotline
          </h4>
          <p className="font-display text-2xl font-bold text-accent">
            999-HEALTH
          </p>
          <div className="mt-4 flex gap-3 text-white/70">
            <FaFacebook /> <FaTwitter /> <FaInstagram /> <FaLinkedin />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center font-body text-xs text-white/50">
        © {new Date().getFullYear()} MediCare Connect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
