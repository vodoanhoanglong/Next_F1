import { getDataHomePage } from "../apis";
import { Blog, Card, IMasterData, IMasterDataType, Introduction, Partner, Slider } from "../components";

export default async function HomePage() {
  try {
    const { products, masterData, blogs } = await getDataHomePage();

    const sliderData = [] as IMasterData[];
    const partnerData = [] as IMasterData[];
    let introduction = {} as IMasterData;

    masterData.forEach((item) => {
      if (item.type === IMasterDataType.Slider) sliderData.push(item);
      else if (item.type === IMasterDataType.Introduction) introduction = item;
      else if (item.type === IMasterDataType.Partner) partnerData.push(item);
      return;
    });

    return (
      <main className="overflow-hidden common-background">
        <Slider images={sliderData} />
        <span className="mt-5 flex justify-center items-center">
          <hr className="divide" />
          <h1 className="whitespace-nowrap">Sản Phẩm Nổi Bật</h1>
          <hr className="divide" />
        </span>
        <div className="mt-20 mb-20 mr-20 ml-20 grid grid-cols-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card card={product} key={product.code} />
          ))}
        </div>
        <span className="mt-5 flex justify-center items-center">
          <hr className="divide" />
          <h1 className="whitespace-nowrap">Giới Thiệu Công Ty</h1>
          <hr className="divide" />
        </span>
        <Introduction introduction={introduction} />
        <span className="mt-5 flex justify-center items-center">
          <hr className="divide" />
          <h1 className="whitespace-nowrap">Bài Viết Tiêu Biểu</h1>
          <hr className="divide" />
        </span>
        <div className="mt-5 grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[blogs[0], blogs[0], blogs[0]].map((blog) => (
            <Blog blog={blog} key={blog.id} />
          ))}
        </div>
        <span className="mt-5 flex justify-center items-center">
          <hr className="divide" />
          <h1 className="whitespace-nowrap">Đối Tác Của Chúng Tôi</h1>
          <hr className="divide" />
        </span>
        <Partner logos={partnerData} />
      </main>
    );
  } catch (error) {
    return (
      <main>
        <p>Errors Something</p>
      </main>
    );
  }
}
