'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';

export const DetailImagesSlider = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="w-full h-80">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true, el: '.custom-pagination' }}
          spaceBetween={20}
          className="h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-80 relative rounded-lg overflow-hidden">
                <img src={image.image_url} alt={`商品画像${index + 1}`} className="object-cover w-full h-full" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ページネーション用 */}
      <div className="custom-pagination flex justify-center mt-4 space-x-2"></div>
    </>
  );
};
