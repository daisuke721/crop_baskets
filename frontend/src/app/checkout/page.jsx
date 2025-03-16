'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createOrder, fetchOrderData } from '../../lib/api/orders';

const Page = () => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getData = async () => {
      const data = await fetchOrderData();
      if (data) {
        setCartItems(data.cart_items);
        setTotalPrice(data.total_price);
      } else {
        setError('データの取得に失敗しました');
      }
      setLoading(false);
    };
    getData();
  }, []);

  const handlePurchase = async () => {
    try {
      await createOrder();
      alert('購入が完了しました！');
      router.push('/complete');
    } catch {
      alert('購入に失敗しました');
    }
  };

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
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
                    <p>{item.commodity_crop.capacity}</p>
                    <p>g</p>
                  </div>
                  <p>/</p>
                  <div className="flex items-center pl-2">
                    <p>¥</p>
                    <p>{item.commodity_crop.price}</p>
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

      <div className="h-24"></div>

      <div className="footer-button">
        <div className="flex items-center justify-center py-8 gap-5">
          <button onClick={handlePurchase} className="font-noto text-xl bg-honey text-white px-5 py-3 rounded-lg">
            購入する
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
