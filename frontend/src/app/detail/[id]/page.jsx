'use client';

import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { fetchCommodityCropById } from '../../../lib/api/commodityCrops';
import { addToCart } from '../../../lib/api/cart';

import { DetailImagesSlider } from '../../../components/DetailImagesSlider';
import { CartModalContent } from '../../../components/CartModalContent';
import { BottomNavigationBar } from '../../../Layout/BottomNavigationBar';
import { fetchMyProducerInformation } from '../../../lib/api/producerInformations';

const Page = ({ params }) => {
  const router = useRouter();
  // 1つの商品作物を購入時にはsingle_purchase_idというクエリパラメータを持たせる
  const handleOrder = () => {
    router.push(`/checkout?single_purchase_id=${commodityCrop.id}`);
  };

  const [commodityCrop, setCommodityCrop] = useState(null);
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  // モーダルを表示
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

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

  // 生産者アイコンと名前
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    (async () => setSummary(await fetchMyProducerInformation()))();
  }, []);

  // 商品作物をカートに追加
  const handleAddToCart = async () => {
    if (!commodityCrop) return;

    await addToCart(commodityCrop.id, commodityCrop.price);
    setIsCartModalOpen(true);
  };

  if (!commodityCrop) return <p>読み込み中...</p>;

  return (
    <>
      <div className="content-area">
        <div className="px-5 mt-5">
          {/* 複数の写真を表示できるようにスライダーで実装 */}
          <DetailImagesSlider images={commodityCrop.commodity_crop_images} />
          <div className="px-5">
            <h1 className="text-xl font-noto font-bold mt-5">{commodityCrop.name}</h1>
            <div className="py-1">
              <div className="flex items-center space-x-3">
                <img
                  src={summary?.image_url || '/placeholder.png'}
                  alt="生産者アイコン"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-xl font-noto">{summary?.name || '未設定の生産者'}</div>
              </div>
            </div>
            <div className="pb-5 mb-3">
              <div className="flex justify-between items-baseline border-b pb-1">
                <div className="flex items-center font-roboto font-semibold text-xl">
                  <p>{commodityCrop.capacity.toLocaleString('ja-JP')}</p>
                  <p>kg</p>
                </div>
                <div className="flex items-center font-robot font-semibold text-3xl">
                  <p>¥</p>
                  <p>{commodityCrop.price.toLocaleString('ja-JP')}</p>
                </div>
              </div>

              <div className="py-2 border-b pb-1">
                <div className="flex justify-between items-center font-noto pb-2 text-base">
                  <p>作物名</p>
                  <p>{commodityCrop.crop.name}</p>
                </div>
                <div className="flex justify-between items-center font-noto pb-2 text-base">
                  <p>品　種</p>
                  <p>{commodityCrop.variety}</p>
                </div>
                <div className="flex justify-between items-center font-noto pb-2 text-base">
                  <p>産　地</p>
                  <p>{commodityCrop.crop.producing_area}</p>
                </div>
                <div className="flex justify-between items-center font-noto pb-2 text-base">
                  <p>収穫日</p>
                  {/* 収穫日をYYYY-MM-DDに変更 */}
                  <p>
                    {new Date(commodityCrop.harvest_day).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </p>
                </div>
                <div className="flex justify-between items-center font-noto pb-2 text-base">
                  <p>等　級</p>
                  <p>{commodityCrop.grade}品</p>
                </div>
                <div className="flex justify-between items-center font-noto pb-2 text-base">
                  <p>状　態</p>
                  <p>{commodityCrop.condition}</p>
                </div>
              </div>

              <div className="py-2 border-b pb-1">
                <div className="flex justify-between items-center font-noto pb-2 text-base">
                  <p>受取場所</p>
                  <p>{commodityCrop.receiving_point.name}</p>
                </div>
                <div className="flex justify-between items-center font-noto pb-2 text-base">
                  <p>受取住所</p>
                  <p>{commodityCrop.receiving_point.address}</p>
                </div>
              </div>
              <div className="flex flex-col font-noto py-2 border-b pb-1 text-base">
                <p>商品説明</p>
                <p className="py-2">{commodityCrop.description}</p>
              </div>
            </div>

            <div className="flex justify-between items-center w-full space-x-5">
              <button
                onClick={handleOrder}
                className="font-noto text-xl bg-sprayGreen text-white border border-sprayGreen w-full py-3 rounded-lg hover:bg-green-600 transition"
              >
                購入手続きへ
              </button>
              <button
                onClick={handleAddToCart}
                className="font-noto text-xl bg-honey text-white border border-honey w-full py-3 rounded-lg hover:bg-yellow-600 transition"
              >
                カートに入れる
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ボトムナビゲーションバー */}
      <BottomNavigationBar />

      {/* カートボタンを押下されたらモーダルが開く */}
      <CartModalContent
        isOpen={isCartModalOpen}
        onGoList={() => {
          setIsCartModalOpen(false);
          router.push('/list');
        }}
        onGoCart={() => {
          setIsCartModalOpen(false);
          router.push('/cart');
        }}
      />
    </>
  );
};

export default Page;
