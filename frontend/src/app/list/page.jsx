'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { fetchCommodityCrops } from '../../lib/api/commodityCrops';
import { addToCart } from '../../lib/api/cart';

import { FaMapMarkerAlt } from 'react-icons/fa';
import { ModalLayout } from '../../Layout/ModalLayout';
import { MainCartAddModalContent } from '../../components/MainCartAddModalContent';
import { BottomNavigationBar } from '../../Layout/BottomNavigationBar';

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

  // モーダル用コンポーネントの呼び出し
  const [isModalOpen, setIsModalOpen] = useState(false);

  // カード内のカートへ入れるがクリックされるとカート内へ追加
  const handleAddToCart = async (e, crop) => {
    // カード全体onClickを止める
    e.stopPropagation();

    try {
      await addToCart(crop.id, crop.price);
      setIsModalOpen(true);
    } catch (error) {
      console.error('カートに追加できませんでした', error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);

  // ページネーション処理
  const totalPages = Math.ceil(commodityCrops.length / ITEMS_PER_PAGE);
  const paginatedCrops = commodityCrops.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <>
      <div className="content-area">
        {/* 商品作物カード */}
        <div className="grid grid-cols-2 gap-3 mx-5 mt-5 mb-10">
          {paginatedCrops.map((crop) => (
            <div
              key={crop.id}
              className="border rounded-lg shadow hover:shadow-lg cursor-pointer overflow-hidden transform hover:scale-95"
              onClick={() => handleDetailID(crop.id)}
            >
              <img
                src={crop.commodity_crop_images[0]?.image_url || '/placeholder.png'}
                width={50}
                height={50}
                alt="商品画像"
                className="w-full h-40 object-cover"
              />
              <div className="px-4 py-2 font-noto flex flex-col justify-between flex-1">
                <div className="flex items-baseline text-xs text-green-700 pb-1 ">
                  <p className="font-noto pr-1">収穫日:</p>
                  {/* 収穫日をYYYY-MM-DDに変更 */}
                  <p className="font-roboto">
                    {new Date(crop.harvest_day).toLocaleDateString('jp-JP', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </p>
                </div>
                <h3 className="text-sm font-semibold line-clamp-2 h-10 overflow-hidden">{crop.name}</h3>
                <div className="text-gray-700">
                  <div className="flex items-center text-xs pt-1 text-gray-500">
                    <FaMapMarkerAlt />
                    <div>{crop.crop_producing_area}</div>
                  </div>
                  <div className="flex justify-between items-baseline text-gray-700">
                    <div className="flex items-center font-roboto bg-gray-100 rounded-md px-2 w-min">
                      <p className="text-sm">{crop.capacity.toLocaleString('ja-JP')}</p>
                      <p className="text-sm">kg</p>
                    </div>
                    <div className="flex justify-end items-baseline font-roboto">
                      <p className="text-base mr-1">¥</p>
                      <p className="text-base">{crop.price.toLocaleString('ja-JP')}</p>
                    </div>
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
          ))}
        </div>
        {/* ページネーションUI */}
        {totalPages >= 1 && (
          <div className="flex justify-center">
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
      </div>

      {/* ナビゲーションバー */}
      <BottomNavigationBar />

      {/* カートボタンを押下されたらモーダルが開く */}
      <ModalLayout isOpen={isModalOpen}>
        <MainCartAddModalContent
          onGoCart={() => {
            setIsModalOpen(false);
            router.push('/cart');
          }}
          onClose={() => setIsModalOpen(false)}
        />
      </ModalLayout>
    </>
  );
};

export default Page;
