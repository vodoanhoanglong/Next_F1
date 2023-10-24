import { getDataHomePage } from "../apis";
import { Blog, Card, Footer, IMasterData, IMasterDataType, Introduction, NavBar, Partner, Slider } from "../components";

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
      <section>
        <NavBar />
        <main className="overflow-hidden common-background">
          <Slider images={sliderData} />
          <span className="mt-5 flex justify-center items-center">
            <h1 className="whitespace-nowrap h1-common sm:h1-common-sm">Danh mục sản phẩm</h1>
          </span>
          <div className="home__product mt-20 mb-20 mr-10 ml-10 grid gap-10 grid-cols-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
            {products.map((product) => (
              <Card card={product} key={product.code} />
            ))}
          </div>
          <span className="mt-5 flex justify-center items-center">
            <h1 className="whitespace-nowrap h1-common sm:h1-common-sm">Giới Thiệu Công Ty</h1>
          </span>
          <Introduction introduction={introduction} />
          <span className="mt-5 flex justify-center items-center">
            <h1 className="whitespace-nowrap h1-common sm:h1-common-sm">Bài Viết Tiêu Biểu</h1>
          </span>
          <div className="home__blog mt-5 grid gap-10 grid-cols-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Blog blog={blog} key={blog.id} />
            ))}
          </div>
          <span className="mt-5 flex justify-center items-center">
            <h1 className="whitespace-nowrap h1-common sm:h1-common-sm">Đối Tác Của Chúng Tôi</h1>
          </span>
          <Partner logos={partnerData} />
        </main>
        <Footer />
      </section>
    );
  } catch (error) {
    return (
      <main>
        <p>Errors Something</p>
      </main>
    );
  }
}
