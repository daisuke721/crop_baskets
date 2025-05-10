'use client';

import { useRouter } from 'next/navigation';
import MainImagesSlider from '../components/MainImagesSlider';
import { MainCardsSlider } from '../components/MainCardsSlider';
import { BottomNavigationBar } from '../Layout/BottomNavigationBar';

export default function Home() {
  const router = useRouter();
  const handleList = () => {
    router.push('/list');
  };

  return (
    <>
      <div className="content-area">
        <div className="mb-10">
          <MainImagesSlider />
        </div>
        {/* 出品された商品作物グループ */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="font-noto font-semibold text-xl text-gray-500">
              <p>新着の商品作物</p>
            </div>
          </div>
          <div className="px-8">
            <MainCardsSlider />
          </div>
          <div className="text-center">
            <button
              onClick={handleList}
              className="font-noto text-honey px-8 py-2 border border-honey bg-white rounded-3xl hover:text-white hover:bg-honey transition"
            >
              もっとみる
            </button>
          </div>
        </div>
        {/* 今、旬のお野菜 */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="font-noto font-semibold text-xl text-gray-500">
              <p># 今、旬のお野菜</p>
            </div>
          </div>
          <div className="px-8">
            <MainCardsSlider />
          </div>
          <div className="text-center">
            <button
              onClick={handleList}
              className="font-noto text-honey px-8 py-2 border border-honey bg-white rounded-3xl hover:text-white hover:bg-honey transition"
            >
              もっとみる
            </button>
          </div>
        </div>
        {/* 規格外の作物 */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="font-noto font-semibold text-xl text-gray-500">
              <p># 規格外の作物</p>
            </div>
          </div>
          <div className="px-8">
            <MainCardsSlider />
          </div>
          <div className="text-center">
            <button
              onClick={handleList}
              className="font-noto text-honey px-8 py-2 border border-honey bg-white rounded-3xl hover:text-white hover:bg-honey transition"
            >
              もっとみる
            </button>
          </div>
        </div>
      </div>
      <BottomNavigationBar />
    </>
  );
}
