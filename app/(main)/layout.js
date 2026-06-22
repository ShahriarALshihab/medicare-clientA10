import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh]">{children}</main>
      <Footer />
    </>
  );
}
