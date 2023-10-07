import Image from "next/image";
// import required modules
import Link from "next/link";
import { IIntroduction, IMasterData, NavBarKey, NavBarLink } from ".";

export default function Introduction({ introduction }: { introduction: IMasterData }) {
  const { imageRight, imageLeft, description } = JSON.parse(introduction.data) as IIntroduction;

  return (
    <div className="introduction">
      <Image src={imageRight} priority quality={100} width="0" height="0" sizes="100vw" alt="introduction" />
      <div className="introduction__content">
        <p>{description}</p>
        <button>
          <Link href={NavBarLink[NavBarKey.About]}>Xem Thêm</Link>
        </button>
      </div>
      <Image src={imageLeft} priority quality={100} width="0" height="0" sizes="100vw" alt="introduction" />
    </div>
  );
}
