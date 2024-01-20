import Image from "next/image";
import Link from "next/link";
import { NavBarKey, NavBarLink } from ".";

export default function FloatButton() {
  return (
    <div className="float__button">
      <Link href={NavBarLink[NavBarKey.Contact]} className="animate__animated animate__heartBeat animate__infinite">
        <Image
          className="float__button-phone"
          src="/contact.png"
          alt="phone"
          priority
          quality={100}
          width={0}
          height={0}
          sizes="100vw"
        />
      </Link>

      <Link href="https://zalo.me/0932509283" className="animate__animated animate__heartBeat animate__infinite">
        <Image
          className="float__button-zalo"
          src="/zalo.jpg"
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
