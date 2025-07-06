'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
  const router = useRouter();

  const handleSignOut = () => {
    // トークンの削除
    localStorage.removeItem('producerToken');

    router.push('/producer/home');
  };
  return (
    <>
      <div className="p-4">
        <h1>生産者ダッシュボード</h1>
        <div>
          <button onClick={handleSignOut} className="text-pink-300 underline text-sm">
            ログアウト
          </button>
        </div>
        <div>
          <a href="/create">出品する</a>
        </div>
        <ul className="space-y-2">
          <li>
            <a href="/producer/profile">プロフィール</a>
          </li>
          <li>
            <a href="/producer/commodity_crop">出品作物リスト</a>
          </li>
          <li>
            <a href="/producer/pickups">受け取りポイント管理</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Page;
