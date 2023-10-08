import { ContactForm } from "../../components";

export default async function ContactPage() {
  return (
    <div className="contact common-background">
      <div className="contact__intro">
        <div className="contact__intro-wrapper">
          <h1>Liên hệ với chúng tôi</h1>
          <p>
            Đừng ngần ngại gửi cho chúng tôi một số dòng. Và nếu bạn không thể chờ đợi, hãy gọi cho chúng tôi ngay bây
            giờ. Vâng! Bạn cũng có thể gửi email cho chúng tôi bằng cách sử dụng mẫu dưới đây!
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
