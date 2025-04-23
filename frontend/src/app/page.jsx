'use client';

import { useRouter } from 'next/navigation';
import Nav from '../components/Nav';
import MainImagesSlider from '../components/MainImagesSlider';
import { MainCardsSlider } from '../components/MainCardsSlider';

import { BottomNavigationBar } from '../components/BottomNavigationBar';

export default function Home() {
  const router = useRouter();
  const handleList = () => {
    router.push('/list');
  };

  return (
    <>
      <div className="content-area">
        <Nav />
        <div className="mb-10">
          <MainImagesSlider />
        </div>
        <div className="flex justify-center">
          <div className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-gray-300">
            <div className="font-noto text-gray-400 pb-2 ">
              <p>出品された商品作物</p>
            </div>
          </div>
        </div>
        <div className="px-8">
          <MainCardsSlider />
        </div>
        <div className="text-center py-10">
          <button
            onClick={handleList}
            className="font-noto text-honey px-6 py-2 border border-honey bg-white rounded-3xl hover:opacity-75"
          >
            もっとみる
          </button>
        </div>
      </div>
      <BottomNavigationBar />
    </>
  );
}
