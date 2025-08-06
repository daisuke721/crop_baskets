'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { fetchMyProducerInformation } from '../../../lib/api/producerInformations';

const Page = () => {
  const router = useRouter();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    (async () => setSummary(await fetchMyProducerInformation()))();
  }, []);

  const handleSignOut = () => {
    // トークンの削除
    localStorage.removeItem('producerToken');

    router.push('/producer/home');
  };
  return (
    <>
      <div className="content-area">
        <div className="w-full px-10 pt-5">
          <h1 className="text-center font-noto text-xl font-bold text-stone-700 mb-4">生産者画面</h1>

          <div className="flex flex-col items-center space-x-3 mb-10">
            <img
              src={summary?.image_url || '/placeholder.png'}
              alt=""
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="text-stone-700">
              <div className="font-bold">{summary?.name || '未設定の生産者'}</div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              onClick={() => router.push('/create')}
              className="font-noto py-2 bg-honey text-white rounded-lg cursor-pointer hover:bg-yellow-600 transition"
            >
              出品する
            </button>
            <button
              onClick={() => router.push('/producer/commodity_crop')}
              className="font-noto py-2 bg-green-300 text-white rounded-lg cursor-pointer hover:bg-green-500 transition"
            >
              出品作物リスト
            </button>
            <button
              onClick={() => router.push('/producer/information')}
              className="font-noto py-2 bg-blue-300 text-white rounded-lg cursor-pointer hover:bg-blue-500 transition"
            >
              生産者情報
            </button>
            <button
              onClick={() => router.push('/producer/receiving_points')}
              className="font-noto py-2 bg-purple-300 text-white rounded-lg cursor-pointer hover:bg-purple-500 transition"
            >
              受け取り所の管理
            </button>
            <button
              onClick={handleSignOut}
              className="font-noto py-2 text-white rounded-lg bg-pink-300 cursor-pointer hover:bg-pink-500 transition"
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
