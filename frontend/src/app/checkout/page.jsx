'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createOrder, fetchOrderData } from '../../lib/api/orders';
import { deleteCommodityCrop, fetchCommodityCropById } from '../../lib/api/commodityCrops';
import { BottomFooterLayout } from '../../Layout/BottomFooterLayout';

const Page = () => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1つの商品作物だけを購入
  const searchParams = useSearchParams();
  // 詳細ページの商品のクエリパラメータを取得
  const singlePurchaseId = searchParams.get('single_purchase_id');

  useEffect(() => {
    const getData = async () => {
      if (singlePurchaseId) {
        // 1つの商品作物を購入
        const commodityCrop = await fetchCommodityCropById(singlePurchaseId);
        if (commodityCrop) {
          setCartItems([
            {
              id: commodityCrop.id,
              commodity_crop: commodityCrop,
            },
          ]);
          setTotalPrice(commodityCrop.price);
        } else {
          setError('商品データの取得に失敗しました');
        }
      } else {
        // カート内を購入
        const data = await fetchOrderData();
        if (data) {
          setCartItems(data.cart_items);
          setTotalPrice(data.total_price);
        } else {
          setError('カートデータの取得に失敗しました');
        }
      }
      setLoading(false);
    };
    getData();
  }, [singlePurchaseId]);

  const handlePurchase = async () => {
    try {
      // 1つの商品作物のみ購入
      // 今は、機能しない
      if (singlePurchaseId) {
        await createOrder({ single_purchase_id: singlePurchaseId });

        // 購入した1つの商品作物を削除
        await deleteCommodityCrop(singlePurchaseId);
      } else {
        // カートで購入
        await createOrder();
        // カート内で購入された全ての商品作物を削除 Promise allを使うことにより一括削除を行える
        await Promise.all(cartItems.map((item) => deleteCommodityCrop(item.commodity_crop.id)));
      }
      // 購入完了後は完了ページに遷移
      router.push('/complete');
    } catch {
      alert('購入に失敗しました');
    }
  };

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="content-area">
        <div className="p-5">
          <h2 className="font-noto text-2xl text-center mb-10">購入手続き</h2>
          <div className="font-noto bg-sprayGreen text-white p-2 rounded-sm my-3">購入内容</div>
          <div className="border rounded-sm p-5">
            {cartItems.map((item) => (
              <div key={item.id} className="flex border-b py-2">
                <img
                  src={item.commodity_crop.commodity_crop_images[0]?.image_url}
                  alt={item.commodity_crop.name}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div className="flex-grow">
                  <p className="font-noto text-lg mb-3">{item.commodity_crop.name}</p>
                  <div className="flex font-roboto">
                    <div className="flex items-center pr-2">
                      <p>{item.commodity_crop.capacity.toLocaleString('ja-JP')}</p>
                      <p>kg</p>
                    </div>
                    <p>/</p>
                    <div className="flex items-center pl-2">
                      <p>¥</p>
                      <p>{item.commodity_crop.price.toLocaleString('ja-JP')}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-2">
              <p className="font-noto">合計金額</p>
              <div className="flex items-center font-roboto text-xl">
                <p>¥</p>
                <p>{parseFloat(totalPrice).toLocaleString('ja-JP')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomFooterLayout>
        <button
          onClick={handlePurchase}
          className="font-noto text-xl bg-honey text-white px-8 py-3 rounded-lg hover:opacity-85 transition"
        >
          購入する
        </button>
      </BottomFooterLayout>
    </>
  );
};

export default Page;
