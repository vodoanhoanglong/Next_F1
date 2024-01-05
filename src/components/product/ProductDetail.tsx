"use client";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { IProductData } from ".";
import { NavBarKey, NavBarLink } from "..";

interface IProductDetailProps {
  product: IProductData;
  relationProducts: IProductData[];
  totalRelationProduct: number;
}

export default function ProductDetail({ product }: IProductDetailProps) {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);

  return (
    <div className="common-background product__detail">
      <div className="product__detail-swiper">
        <Swiper
          style={{}}
          loop={true}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          className="product__detail-swiper__main-slider"
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image src={image} alt={`main_${index}`} priority quality={100} fill />
            </SwiperSlide>
          ))}
        </Swiper>
        {product.images.length === 1 ? null : (
          <Swiper
            onSwiper={setThumbsSwiper as any}
            loop={true}
            spaceBetween={10}
            slidesPerView={product.images.length}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="product__detail-swiper__thump-slider"
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image src={image} alt={`thump_${index}`} priority quality={100} fill />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className="product__detail-content">
        <h1>{product.name}</h1>
        <div className="product__detail-content__info">
          <div className="product__detail-content__info-category">
            <p>
              Danh mục: <b>{product.category.name}</b>
            </p>
            <Image src={product.category.icon} quality={100} width="18" height="0" alt="icon" />
          </div>
          <p>
            Mã CAS: <b>{product.code}</b>
          </p>
          <p>
            Giá sản phẩm: <b>Liên hệ</b>
          </p>
          <p>
            Thương hiệu: <b>{product.brand.data}</b>
          </p>
        </div>
        <h2>Mô tả nhanh:</h2>
        <p className="product__detail-content__des">{product.description}</p>
        <br />
        <Link href={NavBarLink[NavBarKey.Contact]}>
          <h3>Liên hệ đặt sản phẩm</h3>
        </Link>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <div className="flex items-center gap-1">
          <LocationOnIcon color="error" /> Chi nhánh Hồ Chí Minh: <b>0903 929 835 (Mr. Hùng)</b>
        </div>
        <div className="flex items-center gap-1">
          <LocationOnIcon color="error" /> Chi nhánh Hồ Chí Minh: <b>0968 078 353 (Ms. Hương)</b>
        </div>
      </div>
    </div>
  );
}
