import Image from "next/image";
import Link from "next/link";
import { IIntroduction, IMasterData, NavBarKey, NavBarLink } from ".";

export default function Introduction({ introduction }: { introduction: IMasterData }) {
  const { imageLeft, imageRight, imageCenter, description } = JSON.parse(introduction.data) as IIntroduction;

  return (
    <div className="introduction">
      <div className="introduction__container">
        <Image
          src={imageCenter}
          alt="image_intro"
          priority
          quality={100}
          width="0"
          height="0"
          sizes="100vw"
          className="introduction__container-main__banner"
        />
        <Image
          src={imageLeft}
          alt="image_intro"
          priority
          quality={100}
          width="0"
          height="0"
          sizes="100vw"
          className="introduction__container-banner"
        />
        <div className="introduction__container-content">
          <p className="introduction__container-content__des">{description}</p>
          <div className="introduction__container-content__button">
            <button>
              <Link href={NavBarLink[NavBarKey.About]}>Xem Thêm</Link>
            </button>
          </div>
        </div>
        <Image
          src={imageRight}
          alt="image_intro"
          priority
          quality={100}
          width="0"
          height="0"
          sizes="100vw"
          className="introduction__container-banner"
        />
      </div>
    </div>
  );
}
