import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-44 w-full bg-primary-light">
        <Image
          src={doctor.profileImage || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&auto=format&fit=crop&q=60"}
          alt={doctor.doctorName}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-base font-bold text-ink">{doctor.doctorName}</h3>
          <span className="flex items-center gap-1 text-sm font-semibold text-amber-500">
            <FaStar size={13} /> {doctor.ratingAverage?.toFixed(1) || "New"}
          </span>
        </div>
        <p className="font-body text-sm font-medium text-primary">{doctor.specialization}</p>
        <p className="font-body text-xs text-ink/50">{doctor.experience} yrs experience · {doctor.hospitalName}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-display text-sm font-bold text-ink">${doctor.consultationFee}</span>
          <Link href={`/doctors/${doctor._id}`} className="btn btn-sm border-none bg-primary text-white hover:bg-primary-dark">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
