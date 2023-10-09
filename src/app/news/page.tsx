import Image from "next/image";
import { getDataNewsPage } from "../../apis";
import { Footer, NavBar, News } from "../../components";
import { IPageProps } from "../../shared";

export default async function NewsPage({ searchParams }: IPageProps) {
  const { blogs, totalBlog } = await getDataNewsPage(searchParams);

  return (
    <section>
      <NavBar />
      <div className="news">
        <div className="news__intro common-background">
          <div className="news__intro-header">
            <h1>Cập nhật Các thông tin về hoá chất</h1>
            <p>
              Thông tin về các hoá chất mới thường được cập nhật thông qua các cơ quan nghiên cứu, các trường đại học,
              viện nghiên cứu và công ty dược phẩm hoặc hóa chất. Các nguồn thông tin này thường đăng tải bài báo khoa
              học, bản thông cáo hoặc tin tức về các phát hiện mới, các ứng dụng tiềm năng của các hoá chất, và các phản
              ứng hóa học quan trọng.
            </p>
            <br />
            <p>
              Để tìm thông tin về hoá chất mới, bạn có thể sử dụng các công cụ tìm kiếm trực tuyến, cơ sở dữ liệu khoa
              học như PubMed, Scopus hoặc Web of Science, cũng như tham khảo các tạp chí khoa học chuyên ngành. Việc
              tiếp tục theo dõi các phát triển trong lĩnh vực này có thể giúp bạn nắm bắt cơ hội mới và đóng góp vào sự
              phát triển của ngành hóa học và công nghệ.
            </p>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            alt="default"
            priority
            quality={100}
            width={0}
            height={0}
            sizes="100vw"
            className="news__intro-banner"
          />
        </div>
        <News blogs={blogs} totalBlog={totalBlog} />
      </div>
      <Footer />
    </section>
  );
}
