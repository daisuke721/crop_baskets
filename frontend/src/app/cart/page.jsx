'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCartItems, removeCartItem } from '../../lib/api/cart';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BottomFooterLayout } from '../../Layout/BottomFooterLayout';
import { BottomNavigationBar } from '../../Layout/BottomNavigationBar';

const Page = () => {
  const router = useRouter();
  const handleOrder = () => {
    router.push('/checkout');
  };

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const data = await fetchCartItems();
      setCartItems(data);
    };
    loadCart();
  }, []);

  const handleRemoveItem = async (itemId) => {
    const success = await removeCartItem(itemId);
    if (success) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + parseFloat(item.total_price), 0);

  return (
    <>
      <div className="content-area">
        <div className="w-[80%] mx-auto">
          <h2 className="font-noto font-bold text-xl text-center py-5">カート内の商品</h2>
          <div className="border-t">
            {cartItems.map((item) => (
              // この要素にボーダーの幅を調整する
              <div key={item.id} className="flex items-center justify-between py-5 border-b">
                {/* 画像 */}
                <img
                  src={item.commodity_crop.commodity_crop_images[0]?.image_url || '/placeholder.png'}
                  alt="商品画像"
                  className="w-16 h-16 object-cover"
                />
                {/* 商品情報 */}
                <div className="px-5 flex-grow">
                  <p className="font-noto text-lg pb-3 line-clamp-2 overflow-hidden h-14 w-full">
                    {item.commodity_crop.name}
                  </p>
                  <div className="flex justify-end items-center font-roboto pr-5">
                    <div className="flex items-center pr-2">
                      <p>{item.commodity_crop.capacity.toLocaleString('ja-JP')}</p>
                      <p>kg</p>
                    </div>
                    <p>/</p>
                    <div className="flex items-center pl-2">
                      <p>¥</p>
                      <p>{parseFloat(item.total_price).toLocaleString('ja-JP')}</p>
                    </div>
                  </div>
                </div>
                {/* 削除ボタン */}
                <RiDeleteBinLine
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-3xl text-red-300 cursor-pointer"
                />
              </div>
            ))}
          </div>
          {/* 合計金額 */}
          <div className="flex justify-between items-baseline mb-10 border-b pt-5 pb-1">
            <p className="font-noto font-semibold text-lg">合計金額</p>
            <div className="flex items-center font-roboto font-semibold text-2xl">
              <p>¥</p>
              <p>{totalAmount.toLocaleString('ja-JP')}</p>
            </div>
          </div>
          <button
            onClick={handleOrder}
            className="font-noto text-xl w-full bg-sprayGreen text-white py-3 rounded-lg hover:bg-green-600 transition"
          >
            購入手続きへ
          </button>
        </div>
      </div>

      {/* ボトムナビゲーションバー */}
      <BottomNavigationBar />
    </>
  );
};

export default Page;
