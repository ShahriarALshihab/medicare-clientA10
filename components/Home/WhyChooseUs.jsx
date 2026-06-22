import { FaClock, FaShieldAlt, FaUserMd, FaMobileAlt } from "react-icons/fa";

const benefits = [
  { icon: FaClock, title: "Save Time", text: "Book appointments in under a minute, no phone calls or waiting rooms." },
  { icon: FaUserMd, title: "Verified Doctors", text: "Every doctor profile is reviewed and verified by our admin team." },
  { icon: FaShieldAlt, title: "Secure Records", text: "Your medical history and payments are protected end-to-end." },
  { icon: FaMobileAlt, title: "Any Device", text: "A fully responsive experience on mobile, tablet, and desktop." },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding mx-auto max-w-7xl py-16">
      <div className="mb-10 text-center">
        <p className="font-body text-sm font-semibold uppercase tracking-wider text-primary">Our Promise</p>
        <h2 className="font-display text-3xl font-bold text-ink">Why Choose MediCare Connect</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl bg-primary-light p-6">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
              <Icon size={20} />
            </span>
            <h3 className="mb-2 font-display text-base font-bold text-ink">{title}</h3>
            <p className="font-body text-sm text-ink/60">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
