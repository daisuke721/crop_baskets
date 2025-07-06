'use client';

import React from 'react';

const Page = () => {
  return (
    <>
      <div className="p-4">
        <h1>生産者ダッシュボード</h1>
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
