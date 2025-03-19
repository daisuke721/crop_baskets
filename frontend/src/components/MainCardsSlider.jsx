import React, { useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import { fetchCommodityCrops } from '../lib/api/commodityCrops';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

export const MainCardsSlider = () => {
  const router = useRouter();
  const handleDetailId = (id) => {
    router.push(`/detail/${id}`);
  };

  // 商品作物のリストを管理
  const [commodityCrops, setCommodityCrops] = useState([]);

  // Swiperとカスタムナビゲーションボタンの参照を作成
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // コンポーネントがマウントされたときに商品作物データを取得
  useEffect(() => {
    const loadCrops = async () => {
      try {
        const data = await fetchCommodityCrops(); // APIからデータを取得
        setCommodityCrops(data); // 取得したデータをステートにセット
      } catch (error) {
        console.error('商品作物の取得に失敗しました', error);
      }
    };

    loadCrops();
  }, []);

  return (
    <>
      <div className="w-full max-w-5xl mx-auto my-10 relative">
        {/* Swiperのカスタムボタン */}
        <button
          ref={prevRef}
          className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-gray-800/50 text-white rounded-full p-3 z-10 swiper-custom-prev"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          ref={nextRef}
          className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-gray-800/50 text-white rounded-full p-3 z-10 swiper-custom-next"
        >
          <FaChevronRight size={20} />
        </button>
        <Swiper
          ref={swiperRef}
          modules={[Pagination, Navigation]}
          spaceBetween={15}
          slidesPerView={2.5}
          loop={true}
          centeredSlides={true}
          centeredSlidesBounds={true}
          onInit={(swiper) => {
            // Swiperの初期化時にカスタムナビゲーションを設定
            // 正しく参照できているか確認
            if (prevRef.current && nextRef.current) {
              // prevとnextのボタン要素をカスタムボタンに変更
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              // ナビゲーションボタンの設定を有効化
              swiper.navigation.init();
              // Swiperの状態を更新して、ボタンが正しく動作するようにする
              swiper.navigation.update();
            }
          }}
        >
          {commodityCrops.map((crop) => (
            <SwiperSlide key={crop.id}>
              <div
                onClick={() => handleDetailId(crop.id)}
                className="border rounded-lg shadow cursor-pointer overflow-hidden hover:opacity-65"
              >
                <Image
                  src={crop.commodity_crop_images[0]?.image_url || '/placeholder.png'}
                  width={50}
                  height={50}
                  alt="商品画像"
                  className="w-full h-40 object-cover"
                  unoptimized
                />
                <div className="p-4 font-noto">
                  <h3 className="text-center text-xl font-semibold truncate">{crop.name}</h3>
                  <div className="mt-5 text-gray-700">
                    <div className="flex items-center font-roboto bg-gray-50 rounded-xl py-1 px-3 w-min">
                      <p>{crop.capacity}</p>
                      <p>g</p>
                    </div>
                    <div className="flex justify-end items-baseline font-roboto">
                      <p className="text-2xl mr-1">¥</p>
                      <p className="text-2xl">{crop.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
