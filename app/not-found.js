import Link from "next/link";
import { FaHeartPulse } from "react-icons/fa6";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <FaHeartPulse className="text-7xl text-primary" />
      <h1 className="font-display text-6xl font-extrabold text-ink">404</h1>
      <p className="max-w-md font-body text-ink/60">
        We couldn&apos;t locate the page you were looking for. It may have been moved,
        renamed, or it never existed in our records.
      </p>
      <Link href="/" className="btn border-none bg-primary px-8 text-white hover:bg-primary-dark">
        Back to Home
      </Link>
    </div>
  );
}
