"use client";

import { ICategoryData } from "..";

export default function CategoryBanner({ category }: { category: ICategoryData }) {
  return (
    <div className="category__banner">
      {category ? (
        <section
          className="category__banner-image"
          style={{
            backgroundImage: `url(${category.image})`,
          }}
        >
          <div className="category__banner-image__content">
            <h1 className="text-center mb-3">{category.name}</h1>
            <p>{category.description}</p>
          </div>
        </section>
      ) : (
        <section
          className="category__banner-image"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1620908198770-b46654453cf8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80")`,
          }}
        >
          <div className="category__banner-image__content">
            <h1 className="text-center mb-3">Danh Mục Sản Phẩm Của Chúng Tôi</h1>
            <p>
              <b>Chất lượng sản phẩm hàng đầu:</b>
              Công ty Tiến Hùng cam kết cung cấp các sản phẩm hoá chất có chất lượng tốt nhất trong ngành. Chúng tôi
              luôn đảm bảo rằng mọi lô sản phẩm đáp ứng các tiêu chuẩn cao nhất về chất lượng và an toàn.
            </p>
            <p>
              <b>An toàn và bảo vệ môi trường:</b>
              Chúng tôi tuân thủ nghiêm ngặt các quy định an toàn và môi trường. Mục tiêu của chúng tôi là cung cấp các
              sản phẩm hoá chất không chỉ an toàn cho người sử dụng mà còn bảo vệ môi trường.
            </p>
            <p>
              <b>Tận tâm với khách hàng:</b>
              Công ty Tiến Hùng luôn chú trọng đến nhu cầu và yêu cầu của khách hàng. Chúng tôi cam kết cung cấp dịch vụ
              khách hàng xuất sắc và sẵn sàng lắng nghe ý kiến phản hồi từ khách hàng để liên tục cải thiện.
            </p>
            <p>
              <b>Tuân thủ đạo đức kinh doanh:</b>
              Uy tín của chúng tôi dựa trên việc duy trì một tạo đức kinh doanh cao cấp. Chúng tôi luôn tuân thủ các
              nguyên tắc đạo đức trong mọi giao dịch và tương tác kinh doanh.
            </p>
            <p>
              <b>Đội ngũ chuyên nghiệp:</b>
              Công ty Tiến Hùng có đội ngũ nhân viên có kinh nghiệm và chuyên nghiệp, luôn sẵn sàng làm việc chăm chỉ để
              đáp ứng mọi yêu cầu của khách hàng.
            </p>
            <p>
              <b>Tầm nhìn và cam kết:</b>
              Chúng tôi luôn hoàn thiện và phát triển tầm nhìn của mình để trở thành một trong những công ty hàng đầu
              trong ngành hoá chất. Cam kết của chúng tôi là không ngừng phấn đấu để cung cấp giải pháp hoá chất tốt
              nhất cho khách hàng và môi trường.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
