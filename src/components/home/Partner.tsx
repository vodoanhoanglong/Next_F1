import Image from "next/image";
import { IMasterData } from ".";

export default function Partner({ logos }: { logos: IMasterData[] }) {
  return (
    <div className="overflow-x-hidden whitespace-nowrap relative before:content-[''] before:w-[90px] before:h-full before:inline-block before:absolute before:top-0 before:left-0 before:z-[1] before:bg-gradient-to-r before:from-neutral-100 before:to-transparent after:content-[''] after:w-[90px] after:h-full after:inline-block after:absolute after:top-0 after:left-[unset] after:right-0 after:z-[1] after:bg-gradient-to-r after:from-neutral-100 after:to-transparent after:rotate-180">
      <div className="partner">
        {Array(3)
          .fill(0)
          .map((_, itemNo) => (
            <div key={itemNo} className="partner__item w-1/3">
              {logos.map((logo, index) => (
                <Image
                  src={logo.data}
                  key={index}
                  alt={logo.id}
                  priority
                  quality={100}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="partner__item-logo"
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
