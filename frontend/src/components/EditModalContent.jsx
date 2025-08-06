'use client';

export const EditModalContent = ({ isOpen, onGoDashboard }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
        <div className="bg-white p-8 rounded-lg shadow-md text-center w-80">
          <h2 className="font-noto text-xl font-bold mb-6 text-slate-700">作物が更新されました！!</h2>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onGoDashboard}
              className="font-noto text-xs px-6 py-3 bg-sprayGreen text-white rounded hover:bg-green-600 transition"
            >
              生産者画面へ
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
