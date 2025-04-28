'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

const images = [
  '/メイン画像1.png',
  '/「特報」きゅうり.png',
  '/メイン画像2.png',
  '/「絶賛」さつまいも.png',
  '/メイン画像3.png',
  '/「季節」さといも.png',
];

const MainImagesSlider = () => {
  return (
    <>
      <div className="w-full max-w-[480px] mx-auto">
        <Swiper
          modules={[Pagination, Autoplay]} // Swiperに必要なモジュール(ページネーション・自動スライド)を追加
          style={{ width: '100%' }}
          spaceBetween={10} // スライド同士の間隔
          slidesPerView={1.2} // 一度に表示させるスライドの枚数
          centeredSlides={true} // 中央に寄せる
          loop={true}
          // loopAdditionalSlides={5}
          autoplay={{ delay: 3000, disableOnInteraction: false }} // 3秒ごとにスライドを自動で切り替え(ユーザーが操作しても自動スライドを停止しない)
          pagination={{ clickable: true, el: '.custom-pagination' }} // ページネーションのドットナビをクリックできないようにする
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center pt-2">
                {/* unoptimizedで画像の最適化をスキップ、qualityで画像の圧縮を回避し高画質にする */}
                <Image
                  src={src}
                  alt={`Slide ${index}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                  unoptimized
                  quality={100}
                  className="rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination flex justify-center mt-4 space-x-2"></div>
      </div>
    </>
  );
};

export default MainImagesSlider;
