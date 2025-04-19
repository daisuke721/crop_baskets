'use client';

export const ModalLayout = ({ isOpen, children }) => {
  // モーダルを開く状態(isOpen)がfalseの時は何も表示しない(nullを返す)
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">{children}</div>
      </div>
    </>
  );
};
