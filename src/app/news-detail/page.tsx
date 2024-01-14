import Image from "next/image";
import { getDataNewsDetailPage } from "../../apis";
import { DynamicContent, Footer, NavBar, News, RelationProduct } from "../../components";
import { INewsDetailFilterProps, IPageProps } from "../../shared";

export default async function NewsDetailPage({ searchParams }: IPageProps) {
  const { blog, relationBlogs, totalRelationBlog, totalRelationProducts, relationProducts } = await getDataNewsDetailPage(
    searchParams as INewsDetailFilterProps,
  );

  return (
    <section>
      <NavBar />
      <div className="news">
        <div className="common-background">
          <div className="news__intro">
            <div className="news__intro-header">
              <h1 className="news__intro-header__title">{blog.title}</h1>
              <p className="news__intro-header__content">{blog.description}</p>
            </div>
            <Image
              src={blog.banner}
              alt="default"
              priority
              quality={100}
              width={0}
              height={0}
              sizes="100vw"
              className="news__intro-banner"
            />
          </div>
          <p className="news__des">{blog.description}</p>
        </div>
        <div className="news__dynamic">
          <DynamicContent content={blog.content} />
          <div className="news__dynamic-relation">
              <div className="flex justify-center m-[20px]">
                <h2>Sản Phẩm Bán Chạy</h2>
              </div>
              <RelationProduct relationProducts={relationProducts} totalRelationProducts={totalRelationProducts} />
            </div>
        </div>
        <News blogs={relationBlogs} totalBlog={totalRelationBlog} title="Bài viết liên quan" />
      </div>
      <Footer />
    </section>
  );
}
