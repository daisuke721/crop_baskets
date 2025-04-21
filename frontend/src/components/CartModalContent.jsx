'use client';

export const CartModalContent = ({ isOpen, onGoList, onGoCart }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
        <div className="bg-white p-8 rounded-lg shadow-md text-center w-80">
          <h2 className="font-noto text-xl font-bold mb-6 text-slate-700">カートに追加しました!!</h2>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onGoList}
              className="font-noto text-xs px-4 py-3 bg-sprayGreen text-white rounded hover:bg-green-600 transition"
            >
              一覧画面へ進む
            </button>
            <button
              onClick={onGoCart}
              className="font-noto text-xs px-6 py-3 bg-honey text-white rounded hover:bg-yellow-600 transition"
            >
              カートへ進む
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
