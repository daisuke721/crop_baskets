'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCartItems, removeCartItem } from '../../lib/api/cart';
import { RiDeleteBinLine } from 'react-icons/ri';

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
      <div className="p-5 w-[80%] mx-auto">
        <h2 className="font-noto text-2xl text-center mb-10">カート内の商品</h2>
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
              <p className="font-noto text-xl pb-3">{item.commodity_crop.name}</p>
              <div className="flex justify-end items-center font-roboto pr-5">
                <div className="flex items-center pr-2">
                  <p>{item.commodity_crop.capacity}</p>
                  <p>g</p>
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
        {/* 合計金額 */}
        <div className="flex justify-between mt-3">
          <p className="font-noto text-lg">合計金額</p>
          <div className="flex items-center font-roboto text-2xl">
            <p>¥</p>
            <p>{totalAmount.toLocaleString('ja-JP')}</p>
          </div>
        </div>
      </div>

      <div className="h-24"></div>

      <div className="footer-button">
        <div className="flex items-center justify-center py-8 gap-5">
          <button onClick={handleOrder} className="font-noto text-xl bg-sprayGreen text-white px-5 py-3 rounded-lg">
            購入手続きへ
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
