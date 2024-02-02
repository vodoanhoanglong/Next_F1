import { GoogleTagManager } from "@next/third-parties/google";
import "animate.css";
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
  description:
    "Tiến Hùng Chemicals ra đời với tầm nhìn là trở thành một đối tác đáng tin cậy và phát triển bền vững trong lĩnh vực hoá chất công nghiệp. Sự cam kết về chất lượng, sự sáng tạo và khả năng đáp ứng linh hoạt là những đặc điểm định danh của Hoá chất Tiến Hùng. Chúng tôi mong muốn xây dựng mối quan hệ đối tác bền vững với khách hàng và cộng đồng, đồng hành trong việc đạt được sự thành công và phát triển bền vững. Hãy để chúng tôi là người bạn đồng hành đáng tin cậy của bạn trong lĩnh vực hoá chất, và chúng tôi sẽ luôn cố gắng hết mình để đem lại giá trị tốt nhất cho bạn.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <main>{children}</main>
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
