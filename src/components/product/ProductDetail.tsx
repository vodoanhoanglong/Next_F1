"use client";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Divider } from "@mui/material";
import Image from "next/image";
import React from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { IProductData } from ".";
import { convertCurrencyToVND } from "../../shared";

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
              <Image src={image} alt={`main_${index}`} priority quality={100} width="0" height="0" sizes="100vw" />
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
                <Image src={image} alt={`thump_${index}`} priority quality={100} width="0" height="0" sizes="100vw" />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className="product__detail-content">
        <h1>{product.name}</h1>
        <div className="flex justify-start gap-10 whitespace-nowrap">
          <p>
            Mã sản phẩm: <b>{product.code}</b>
          </p>
          <p>
            Giá: <b>{convertCurrencyToVND(product.price)}</b>
          </p>
          <p>
            Thương hiệu: <b>{product.brand.data}</b>
          </p>
        </div>
        <h2>Mô tả nhanh:</h2>
        <p className="product__detail-content__des">{product.description}</p>
        <h3>Liên hệ đặt sản phẩm</h3>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <div className="flex items-center gap-1">
          <LocationOnIcon color="error" /> Chi nhánh Hà Nội: <b>0932 765 080 (Mr.Long)</b>
        </div>
        <div className="flex items-center gap-1">
          <LocationOnIcon color="error" /> Chi nhánh Đà Nẵng: <b>0909 320 502 (Mr.Hoàn)</b>
        </div>
        <div className="flex items-center gap-1">
          <LocationOnIcon color="error" /> Chi nhánh Hồ Chí Minh: <b>0909 230 102 (Ms.Đào)</b>
        </div>
      </div>
    </div>
  );
}
