import Image from "next/image";
import { DynamicContent, IIntroduction, IMasterData, Partner } from "..";

export default function About({
  parseData,
  introduction,
  partner,
}: {
  parseData: IIntroduction;
  introduction: IMasterData;
  partner: IMasterData[];
}) {
  return (
    <div className="about">
      <div className="about__content common-background">
        <div className="about__content-detail">
          <h1>{parseData.title}</h1>
          <p>{parseData.description}</p>
        </div>
      </div>
      <div className="about__des">
        <div className="about__des-banner">
          <Image
            src={parseData.imageLeft}
            alt="imageLeft"
            priority
            quality={100}
            width={0}
            height={0}
            sizes="100vw"
            className="about__des-banner__out"
          />
          <Image
            src={parseData.imageCenter}
            alt="imageCenter"
            priority
            quality={100}
            width={0}
            height={0}
            sizes="100vw"
            className="about__des-banner__in"
          />
          <Image
            src={parseData.imageRight}
            alt="imageRight"
            priority
            quality={100}
            width={0}
            height={0}
            sizes="100vw"
            className="about__des-banner__out"
          />
        </div>
        <h1 className="flex justify-center mb-[50px] uppercase">THÔNG TIN CHI TIẾT</h1>
        <DynamicContent content={introduction.additionalValue} />
      </div>
      {partner.length ? (
        <>
          <h1 className="flex justify-center mt-[150px] uppercase">Đối Tác Của Chúng Tôi</h1>
          <Partner logos={partner} />
        </>
      ) : null}
    </div>
  );
}
