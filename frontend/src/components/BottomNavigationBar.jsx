'use client';

import { useRouter } from 'next/navigation';
import { FaHome, FaCarrot } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import { GiBasket } from 'react-icons/gi';
import { CiMenuBurger } from 'react-icons/ci';

export const BottomNavigationBar = () => {
  const router = useRouter();

  return (
    <>
      {/* ヘッダーの縦幅と同じ高さをブロックを追加し、ヘッダーが被らないようにする */}
      <div className="h-14"></div>
      {/* 共通のボトムフッターのレイアウト */}
      <div className="absolute bottom-0 left-0 w-full border-t border-gray-100 bg-white h-14">
        <div className="flex justify-center py-4">
          <nav className="w-full flex justify-around items-center">
            <button onClick={() => router.push('/')} className="text-sprayGreen hover:text-honey text-2xl">
              <FaHome />
            </button>
            <button onClick={() => router.push('#')} className="text-sprayGreen hover:text-honey text-2xl">
              <FaUser />
            </button>
            <button onClick={() => router.push('/cart')} className="text-sprayGreen hover:text-honey text-2xl">
              <GiBasket />
            </button>
            <button onClick={() => router.push('/')} className="text-sprayGreen hover:text-honey text-2xl">
              <FaCarrot />
            </button>
            <button onClick={() => router.push('/')} className="text-sprayGreen hover:text-honey text-2xl">
              <CiMenuBurger />
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};
