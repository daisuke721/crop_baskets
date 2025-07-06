'use client';

import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  return (
    <>
      <div>
        <div className="px-3">
          <h1 className="font-noto font-bold text-lg text-center">生産者画面</h1>
          <div className="flex justify-center">
            <div className="w-4/5 py-3 px-5 border rounded">
              <div className="flex flex-col space-y-4">
                <div>
                  <button
                    onClick={() => router.push('/producer/signup')}
                    className="w-full py-1 font-noto bg-blue-600 text-white rounded"
                  >
                    新規登録
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => router.push('/producer/login')}
                    className="w-full py-1 font-noto bg-green-600 text-white rounded"
                  >
                    ログイン
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
