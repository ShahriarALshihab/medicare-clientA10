import Link from "next/link";
import { FaStethoscope } from "react-icons/fa";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-primary-light/40">
      <div className="flex justify-center py-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
            <FaStethoscope size={18} />
          </span>
          <span className="font-display text-lg font-bold text-ink">
            MediCare<span className="text-accent"> Connect</span>
          </span>
        </Link>
      </div>
      {children}
      <p className="pb-8 text-center font-body text-xs text-ink/40">
        © {new Date().getFullYear()} MediCare Connect
      </p>
    </div>
  );
}
