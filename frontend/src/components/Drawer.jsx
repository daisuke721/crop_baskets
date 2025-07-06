'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const Drawer = ({ isOpen, onClose }) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <>
      {/* オーバーレイ */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>}

      {/* ドロワー */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="content-area">
          <div className="h-full">
            <div className="py-3 border-b border-b-gray-300">
              <div className="flex justify-between items-center px-3">
                <h2 className="tex-lg font-bold">メニュー</h2>
                <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-700">
                  ×
                </button>
              </div>
            </div>
            <ul className="w-full">
              <li className="py-2 px-3">
                <button
                  className="font-noto w-full py-2 px-3 bg-honey text-white rounded-full hover:bg-yellow-500 shadow-md transition-all duration-300"
                  onClick={() => router.push('/producer/home')}
                >
                  <span className="block text-base font-bold leading-tight">生産者の方々へ</span>
                  <span className="block text-sm font-light leading-snug">こちらをクリック</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
