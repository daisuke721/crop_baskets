'use client';

import { createPortal } from 'react-dom';

export const ModalLayout = ({ isOpen, children }) => {
  // モーダルを開く状態(isOpen)がfalseの時は何も表示しない(nullを返す)
  if (!isOpen) return null;

  const modal = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-80">{children}</div>
    </div>
  );

  return createPortal(modal, document.body);
};
