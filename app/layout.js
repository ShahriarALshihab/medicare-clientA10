import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/providers/AuthProvider";

export const metadata = {
  title: "MediCare Connect | Hospital Appointment & Healthcare Management",
  description:
    "Book doctor appointments, manage prescriptions, and access healthcare services online with MediCare Connect.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="medicare">
      <body className="font-body">
        <AuthProvider>
          {children}
          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
