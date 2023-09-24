import Image from "next/image";

export interface ICardData {
  id: string;
  code: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  category: Category;
}

export interface Category {
  name: string;
  code: string;
}

export default function Card({ card }: { card: ICardData }) {
  return (
    <div className="card">
      <Image
        src={card.images[0]}
        // src="https://images.unsplash.com/photo-1621075160523-b936ad96132a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="NFT"
        priority
        quality={100}
        width="0"
        height="0"
        sizes="100vw"
        className="card__image"
      />
      <div className="card__container">
        <h2 className="font-extrabold">{card.name}</h2>
        <h4 className="font-bold">{card.code}</h4>
        <p className="card__container--description">{card.description}</p>
        <hr />
        <div className="card__container--creator">
          <p className="font-semibold">{card.category.name}</p>
        </div>
      </div>
    </div>
  );
}
