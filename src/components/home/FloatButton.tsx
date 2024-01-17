import Image from "next/image";
import Link from "next/link";

export default function FloatButton() {
  return (
    <div className="float__button">
      <Link
        href={"#"}
        onClick={(e) => {
          window.location = "tel:+84903929835" as unknown as Location;
          e.preventDefault();
        }}
      >
        <Image
          className="float__button-phone"
          src="/telephone.png"
          alt="phone"
          priority
          quality={100}
          width={0}
          height={0}
          sizes="100vw"
        />
      </Link>

      <Link href="https://zalo.me/0932509283">
        <Image
          className="float__button-zalo"
          src="/zalo.png"
          alt="zalo"
          priority
          quality={100}
          width={0}
          height={0}
          sizes="100vw"
        />
      </Link>
    </div>
  );
}
