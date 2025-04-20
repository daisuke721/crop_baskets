'use client';

export const CreateModalContent = ({ onClose, onGoHome }) => {
  return (
    <>
      <h2 className="font-noto text-2xl font-bold mb-6 text-slate-700">作物が出品されました！!</h2>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onGoHome}
          className="font-noto px-6 py-3 bg-sprayGreen text-white rounded hover:bg-green-600 transition"
        >
          ホームへ戻る
        </button>
        <button
          onClick={onClose}
          className="font-noto px-6 py-3 bg-honey text-white rounded hover:bg-yellow-600 transition"
        >
          出品を続ける
        </button>
      </div>
    </>
  );
};
