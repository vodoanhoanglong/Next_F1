import Image from "next/image";
// import required modules
import { IIntroduction, IMasterData } from ".";

export default function Introduction({ introduction }: { introduction: IMasterData }) {
  const { image, description } = JSON.parse(introduction.data) as IIntroduction;
  return (
    <div className="introduction">
      <Image src={image} priority quality={100} width="0" height="0" sizes="100vw" alt="introduction" />
      <div className="introduction__content">
        <p>{description}</p>
        <button>Xem Thêm</button>
      </div>
    </div>
  );
}
