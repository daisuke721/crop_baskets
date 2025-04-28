'use client';

export const MainCartAddModalContent = ({ onGoCart, onClose }) => {
  return (
    <>
      <h2 className="font-noto text-xl font-bold mb-6 text-slate-700">カートに追加しました！!</h2>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onGoCart}
          className="font-noto text-xs px-6 py-3 bg-honey text-white rounded hover:bg-yellow-600 transition"
        >
          カートへ進む
        </button>
        <button
          onClick={onClose}
          className="font-noto text-xs px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-700 transition"
        >
          画面を閉じる
        </button>
      </div>
    </>
  );
};
