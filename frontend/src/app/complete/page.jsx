'use client';

import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const handleHome = () => {
    router.push('/');
  };
  return (
    <>
      <div className="content-area">
        <div className="flex flex-col items-center mt-28">
          <h1 className="font-noto text-honey text-3xl tracking-wide">Thank you .</h1>
          <p className="font-noto text-gray-400 text-xl my-10">購入完了です</p>
          <button
            onClick={handleHome}
            className="font-noto text-lg bg-sprayGreen text-white rounded-md px-6 py-2 hover:bg-green-200"
          >
            ホームへ戻る
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
