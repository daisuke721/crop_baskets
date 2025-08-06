'use client';

import { useEffect, useState } from 'react';
import { deleteCommodityCrop, fetchMyCommodityCrops } from '../../../lib/api/commodityCrops';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [crops, setCrops] = useState([]);
  const router = useRouter();

  const loadCrops = async () => {
    try {
      const data = await fetchMyCommodityCrops();
      setCrops(data);
    } catch (err) {
      console.error('出品作物の取得に失敗', err);
    }
  };

  useEffect(() => {
    loadCrops();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('本当に削除しますか？')) return;
    try {
      await deleteCommodityCrop(id);
      setCrops((prev) => prev.filter((crop) => crop.id !== id));
    } catch (err) {
      console.error('削除失敗:', err);
    }
  };

  return (
    <>
      <div className="content-area">
        <div className="p-4">
          <h1 className="text-xl text-center font-noto font-bold mb-4">出品作物リスト</h1>
          <ul className="space-y-4">
            {crops.map((crop) => (
              <li key={crop.id} className="border p-3 rounded-md">
                <div>
                  <img
                    src={crop.commodity_crop_images[0]?.image_url || '/placeholder.png'}
                    alt={crop.name}
                    className="w-16 h-16 object-cover"
                  />
                </div>
                <p className="font-noto truncate">商品名: {crop.name}</p>
                <p className='"font-noto'>価格: {crop.price.toLocaleString('ja-JP')}円</p>
                <button
                  onClick={() => router.push(`/producer/commodity_crop/edit/${crop.id}`)}
                  className="text-blue-500 underline text-sm mr-3"
                >
                  編集する
                </button>
                <button onClick={() => handleDelete(crop.id)} className="text-red-500 underline font-noto text-sm mt-2">
                  削除する
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Page;
