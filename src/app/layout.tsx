import type { Metadata } from "next";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "../styles/globals.scss";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Tien Hung Chemicals",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
