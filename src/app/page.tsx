import Link from "next/link";
import { getDataHomePage } from "../apis";
import {
  Blog,
  CardCategory,
  Footer,
  IMasterData,
  IMasterDataType,
  Introduction,
  NavBar,
  NavBarKey,
  NavBarLink,
  Partner,
  Slider,
} from "../components";

export default async function HomePage() {
  try {
    const { categories, masterData, blogs } = await getDataHomePage();

    let sliderData = [] as string[];
    let partnerData = [] as string[];
    let introduction = {} as IMasterData;

    masterData.forEach((item) => {
      if (item.type === IMasterDataType.Slider) sliderData = JSON.parse(item.data);
      else if (item.type === IMasterDataType.Introduction) introduction = item;
      else if (item.type === IMasterDataType.Partner) partnerData = JSON.parse(item.data);
      return;
    });

    return (
      <section>
        <NavBar />
        <div className="overflow-hidden common-background">
          <Slider images={sliderData} />
          <span className="mt-5 flex justify-center items-center">
            <h1 className="whitespace-nowrap h1-common sm:h1-common-sm">Danh mục</h1>
          </span>
          <div className="home__product mt-20 mb-20 mr-10 ml-10 grid gap-10 grid-cols-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 min-[1680px]:grid-cols-4">
            {categories.map((category) => (
              <CardCategory key={category.code} category={category} />
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
              <Link key={blog.id} href={`${NavBarLink[NavBarKey.NewsDetail]}?page=1&newsId=${blog.id}`}>
                <Blog blog={blog} />
              </Link>
            ))}
          </div>
          <span className="mt-5 flex justify-center items-center">
            <h1 className="whitespace-nowrap h1-common sm:h1-common-sm">Đối Tác Của Chúng Tôi</h1>
          </span>
          <Partner logos={partnerData} />
        </div>
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
