'use client';

export const CartModalContent = ({ onGoList, onGoCart }) => {
  return (
    <>
      <h2 className="font-noto text-2xl font-bold mb-6 text-slate-700">カートに追加しました!!</h2>
      <div className="flex justify-center space-x-4">
        <button onClick={onGoList} className="px-4 py-3 bg-sprayGreen text-white rounded hover:bg-green-600 transition">
          一覧画面へ進む
        </button>
        <button onClick={onGoCart} className="px-6 py-3 bg-honey text-white rounded hover:bg-yellow-600 transition">
          カートへ進む
        </button>
      </div>
    </>
  );
};
