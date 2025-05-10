'use client';

export const AnalyzingModal = () => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
        <div className="bg-white rounded-lg shadow-lg p-4 overflow-hidden w-80">
          <p className="font-noto text-xl bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400  bg-clip-text text-transparent animate-marquee whitespace-nowrap">
            🧑‍🌾 画像を解析中です...🫑 🍅 🥦
          </p>
        </div>
      </div>
    </>
  );
};
