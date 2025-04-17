'use client';

export const SuccessModal = ({ isOpen, onClose, onGoHome }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="font-noto text-2xl font-bold mb-6 text-slate-700">作物が出品されました！!</h2>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onGoHome}
              className="px-6 py-3 bg-sprayGreen text-white rounded hover:bg-green-600 transition"
            >
              ホームへ戻る
            </button>
            <button onClick={onClose} className="px-6 py-3 bg-honey text-white rounded hover:bg-yellow-600 transition">
              出品を続ける
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
