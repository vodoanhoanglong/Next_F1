import { FaPhone } from "react-icons/fa6";

export default function ContactBar() {
  return (
    <div className="contact__bar">
      <div className="contact__bar-content">
        <p>
          <FaPhone /> 0903 929 835 (Mr. Hùng)
        </p>
        <p>
          <FaPhone /> 0968 078 353 (Ms. Hương)
        </p>
      </div>
    </div>
  );
}
