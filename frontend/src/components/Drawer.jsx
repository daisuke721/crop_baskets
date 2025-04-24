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
        <div className="p-4">
          <h2 className="tex-lg font-bold mb-4">メニュー</h2>
          <ul>
            <li>
              <button
                className="font-noto w-24 py-1 px-2 bg-honey text-white rounded-full hover:bg-yellow-500"
                onClick={() => router.push('/create')}
              >
                出品
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
