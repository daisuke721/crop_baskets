'use client';

import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { fetchCommodityCropById } from '../../../lib/api/commodityCrops';
import { addToCart } from '../../../lib/api/cart';

import { DetailImagesSlider } from '../../../components/DetailImagesSlider';
import { BottomFooterLayout } from '../../../Layout/BottomFooterLayout';

const Page = ({ params }) => {
  const router = useRouter();
  const handleOrder = () => {
    router.push('/checkout');
  };

  const [commodityCrop, setCommodityCrop] = useState(null);
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  useEffect(() => {
    const loadCommodityCrop = async () => {
      try {
        const data = await fetchCommodityCropById(id);
        setCommodityCrop(data);
      } catch (error) {
        console.error('商品詳細の取得に失敗しました', error);
      }
    };

    loadCommodityCrop();
  }, [id]);

  // 商品作物をカートに追加
  const handleAddToCart = async () => {
    if (!commodityCrop) return;

    await addToCart(commodityCrop.id, commodityCrop.price);
    alert(`${commodityCrop.name} をカートに追加しました！`);
    router.push('/cart');
  };

  if (!commodityCrop) return <p>読み込み中...</p>;

  return (
    <>
      <div className="content-area">
        <div className="px-5 mt-14">
          {/* <img
            src={commodityCrop.commodity_crop_images[0].image_url}
            alt="商品画像"
            className="w-full h-80 object-cover"
          /> */}
          {/* 複数の写真を表示できるようにスライダーで実装 */}
          <DetailImagesSlider images={commodityCrop.commodity_crop_images} />
          <h1 className="text-4xl font-noto font-bold my-5">{commodityCrop.name}</h1>
          <div className="px-3 py-5">
            <div className="flex justify-between items-center border-b pb-1">
              <div className="flex items-center font-roboto text-2xl">
                <p>{commodityCrop.capacity}</p>
                <p>kg</p>
              </div>
              <div className="flex items-center font-robot text-2xl">
                <p>¥</p>
                <p>{commodityCrop.price}</p>
              </div>
            </div>
            <div className="px-5 py-3 border-b pb-1">
              <div className="flex justify-between items-center font-noto pb-2 text-lg">
                <p className="text-gray-400">作物名</p>
                <p>{commodityCrop.crop.name}</p>
              </div>
              <div className="flex justify-between items-center font-noto pb-2 text-lg">
                <p className="text-gray-400">品　種</p>
                <p>{commodityCrop.variety}</p>
              </div>
              <div className="flex justify-between items-center font-noto pb-2 text-lg">
                <p className="text-gray-400">産　地</p>
                <p>{commodityCrop.crop.producing_area}</p>
              </div>
              <div className="flex justify-between items-center font-noto pb-2 text-lg">
                <p className="text-gray-400">収穫日</p>
                {/* 収穫日をYYYY-MM-DDに変更 */}
                <p>
                  {new Date(commodityCrop.harvest_day).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </p>
              </div>
            </div>
            <div className="flex flex-col font-noto px-5 py-3 border-b pb-1">
              <p className="text-gray-500 text-xl">商品説明</p>
              <p className="px-3 py-3">{commodityCrop.description}</p>
            </div>
          </div>
        </div>
      </div>

      <BottomFooterLayout>
        <div className="items-center space-x-5">
          <button
            onClick={handleOrder}
            className="font-noto text-xl bg-sprayGreen text-white border border-sprayGreen px-5 py-3 rounded-lg hover:bg-white hover:text-sprayGreen transition"
          >
            購入手続きへ
          </button>
          <button
            onClick={handleAddToCart}
            className="font-noto text-xl bg-white text-honey border border-honey px-2 py-3 rounded-lg hover:bg-honey hover:text-white transition"
          >
            カートに入れる
          </button>
        </div>
      </BottomFooterLayout>
    </>
  );
};

export default Page;
