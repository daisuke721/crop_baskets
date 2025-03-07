'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCommodityCrops } from '../../lib/api/commodityCrops';

const ITEMS_PER_PAGE = 30;

const Page = () => {
  const router = useRouter();
  // 商品作物の詳細ページに遷移するためにidを指定
  const handleDetailID = (id) => {
    router.push(`/detail/${id}`);
  };

  const [commodityCrops, setCommodityCrops] = useState([]);

  useEffect(() => {
    const loadCrops = async () => {
      try {
        const data = await fetchCommodityCrops();
        setCommodityCrops(data);
      } catch (error) {
        console.error('商品一覧の取得に失敗しました', error);
      }
    };

    loadCrops();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  // ページネーション処理
  const totalPages = Math.ceil(commodityCrops.length / ITEMS_PER_PAGE);
  const paginatedCrops = commodityCrops.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <>
      {/* 商品作物カード */}
      <div className="grid grid-cols-2 gap-3 mx-5 my-24">
        {paginatedCrops.map((crop) => (
          <div
            key={crop.id}
            className="border rounded-lg shadow cursor-pointer overflow-hidden"
            onClick={() => handleDetailID(crop.id)}
          >
            {crop.commodity_crop_images.length > 0 ? (
              <img
                src={crop.commodity_crop_images[0].image_url}
                width={50}
                height={50}
                alt="商品画像"
                className="w-full h-40 object-cover"
              />
            ) : (
              <img
                src="/placeholder.png"
                width={50}
                height={50}
                alt="プレースホルダー"
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4 font-noto">
              <h3 className="text-center text-xl font-semibold">{crop.name}</h3>
              <div className="mt-5 text-gray-700">
                <div className="flex items-center font-roboto bg-gray-50 rounded-xl py-1 px-3 w-min">
                  <p>{crop.capacity}</p>
                  <p>g</p>
                </div>
                <div className="flex justify-end items-baseline font-roboto">
                  <p className="text-2xl text-gray-500 mr-1">¥</p>
                  <p className="text-2xl">{crop.price}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ページネーションUI */}
      {totalPages >= 1 && (
        <div className="flex justify-center mt-5">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 w-8 h-8 rounded-full flex items-center justify-center ${
                currentPage === index + 1 ? 'bg-honey text-white' : 'bg-sprayGreen text-white'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Page;
