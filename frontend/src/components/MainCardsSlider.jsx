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
import { FaMapMarkerAlt } from 'react-icons/fa';
import { addToCart } from '../lib/api/cart';
import { ModalLayout } from '../Layout/ModalLayout';
import { MainCartAddModalContent } from './MainCartAddModalContent';

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

  // カード内のカートへ入れるがクリックされるとカート内へ追加
  const handleAddToCart = async (e, crop) => {
    // カード全体のonClickを止める
    e.stopPropagation();

    try {
      await addToCart(crop.id, crop.price);
      setIsModalOpen(true);
    } catch (error) {
      console.error('カートに追加できませんでした', error);
    }
  };

  // モーダル用コンポーネントの呼び出し
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full max-w-5xl mx-auto my-5 relative">
        {/* Swiperのカスタムボタン */}
        <button
          ref={prevRef}
          className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-gray-800/50 text-white rounded-full p-3 z-10 swiper-custom-prev hover:opacity-85"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          ref={nextRef}
          className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-gray-800/50 text-white rounded-full p-3 z-10 swiper-custom-next hover:opacity-85"
        >
          <FaChevronRight size={20} />
        </button>
        <Swiper
          ref={swiperRef}
          modules={[Pagination, Navigation]}
          spaceBetween={10}
          slidesPerView={2.2}
          loop={true}
          centeredSlides={true}
          // centeredSlidesBounds={true}
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
              <div className="mt-1">
                <div
                  onClick={() => handleDetailId(crop.id)}
                  className="w-full max-w-[192px] mx-auto border rounded-lg shadow cursor-pointer overflow-hidden transform transition-transform hover:-translate-y-1"
                >
                  <Image
                    src={crop.commodity_crop_images[0]?.image_url || '/placeholder.png'}
                    width={50}
                    height={50}
                    alt="商品画像"
                    className="w-full h-40 object-cover"
                    unoptimized
                  />
                  <div className="px-4 py-2 font-noto">
                    <h3 className="text-sm font-semibold truncate">{crop.name}</h3>
                    <div className="flex items-center text-xs pt-1 text-gray-500">
                      <FaMapMarkerAlt />
                      <div>{crop.crop_producing_area}</div>
                    </div>
                    <div className="flex justify-between items-baseline text-gray-700">
                      <div className="flex text-xs items-center font-roboto bg-gray-100 rounded-md px-2 w-min">
                        <p>{crop.capacity.toLocaleString('ja-JP')}</p>
                        <p>kg</p>
                      </div>
                      <div className="flex justify-end items-baseline font-roboto">
                        <p className="text-base mr-1">¥</p>
                        <p className="text-base">{crop.price.toLocaleString('ja-JP')}</p>
                      </div>
                    </div>
                    <div className="flex justify-center mt-2 mb-1 border-t pt-3">
                      <button
                        onClick={(e) => handleAddToCart(e, crop)}
                        className="font-noto text-sm bg-honey text-white w-full py-1 rounded-2xl hover:bg-yellow-700 hover:opacity-100 transition"
                      >
                        カートへ入れる
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* カートボタンが押されるとモーダルを表示 */}
        <ModalLayout isOpen={isModalOpen}>
          <MainCartAddModalContent
            onGoCart={() => {
              setIsModalOpen(false);
              router.push('/cart');
            }}
            onClose={() => setIsModalOpen(false)}
          />
        </ModalLayout>
      </div>
    </>
  );
};
