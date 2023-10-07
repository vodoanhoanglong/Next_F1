import Image from "next/image";
import { getDataNewsDetailPage } from "../../apis";
import { DynamicContent, News } from "../../components";
import { INewsDetailFilterProps, IPageProps } from "../../shared";

export default async function NewsDetailPage({ searchParams }: IPageProps) {
  const { blog, relationBlogs, totalRelationBlog } = await getDataNewsDetailPage(
    searchParams as INewsDetailFilterProps,
  );

  return (
    <div className="news-detail">
      <div className="news-detail__intro common-background">
        <div className="news-detail__intro-header">
          <h1>{blog.title}</h1>
          <p>{blog.description}</p>
        </div>
        <Image
          src={blog.banner}
          alt="default"
          priority
          quality={100}
          width={0}
          height={0}
          sizes="100vw"
          className="news-detail__intro-banner"
        />
      </div>
      <div className="news-detail__container">
        <DynamicContent content={blog.content} />
      </div>
      <News blogs={relationBlogs} totalBlog={totalRelationBlog} title="Bài viết liên quan" />
    </div>
  );
}
