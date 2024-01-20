import Link from "next/link";
import { FaPhone } from "react-icons/fa6";

export default function ContactBar() {
  return (
    <div className="contact__bar">
      <div className="contact__bar-content">
        <Link
          href={"#"}
          onClick={(e) => {
            window.location = "tel:+84903929835" as unknown as Location;
            e.preventDefault();
          }}
        >
          <p style={{ cursor: "pointer" }}>
            <FaPhone className="animate__animated animate__heartBeat animate__infinite" /> 0903 929 835 (Mr. Hùng)
          </p>
        </Link>
        <Link
          href={"#"}
          onClick={(e) => {
            window.location = "tel:+84968078353" as unknown as Location;
            e.preventDefault();
          }}
        >
          <p style={{ cursor: "pointer" }}>
            <FaPhone className="animate__animated animate__heartBeat animate__infinite" /> 0968 078 353 (Ms. Hương)
          </p>
        </Link>
      </div>
    </div>
  );
}
