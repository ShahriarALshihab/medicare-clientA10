import { FaHeartbeat, FaBrain, FaBone, FaBaby, FaAllergies } from "react-icons/fa";

const specializations = [
  { name: "Cardiology", icon: FaHeartbeat },
  { name: "Neurology", icon: FaBrain },
  { name: "Orthopedics", icon: FaBone },
  { name: "Pediatrics", icon: FaBaby },
  { name: "Dermatology", icon: FaAllergies },
];

const Specializations = () => {
  return (
    <section className="section-padding mx-auto max-w-7xl py-16">
      <div className="mb-10 text-center">
        <p className="font-body text-sm font-semibold uppercase tracking-wider text-primary">Browse By</p>
        <h2 className="font-display text-3xl font-bold text-ink">Medical Specializations</h2>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
        {specializations.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-3 rounded-2xl border border-primary/10 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
              <Icon size={24} />
            </span>
            <p className="font-body text-sm font-semibold text-ink">{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Specializations;
