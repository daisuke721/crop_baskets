'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { fetchMyReceivingPoints, deleteReceivingPoint } from '../../../lib/api/receivingPoints';

const Page = () => {
  const router = useRouter();

  const [receivingPoints, setReceivingPoints] = useState([]);
  const [error, setError] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('producerToken') : null;

  // 自分の受け取り所一覧を取得
  const loadReceivingPoints = useCallback(async () => {
    try {
      const data = await fetchMyReceivingPoints(token);
      setReceivingPoints(data);
    } catch (err) {
      console.error('取得に失敗:', err);
      setError('一覧の取得に失敗しました');
    }
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('この受け取り所を削除しますか？')) return;

    try {
      await deleteReceivingPoint(id, token);
      setReceivingPoints((prev) => prev.filter((point) => point.id !== id));
    } catch (err) {
      console.error('削除エラー:', err);
      setError('削除に失敗しました');
    }
  };

  useEffect(() => {
    if (token) loadReceivingPoints();
  }, [token, loadReceivingPoints]);

  return (
    <>
      <div className="content-area">
        <div className="w-full px-10 pt-5">
          <h1 className="text-center font-noto text-xl font-bold  text-stone-700 mb-4">受け取り所の管理</h1>
          <div>
            <button
              onClick={() => router.push('/producer/receiving_points/create')}
              className="w-full font-noto py-2 bg-purple-300 text-white rounded-lg cursor-pointer hover:bg-purple-500 transition"
            >
              受け取り所を登録
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}

          {receivingPoints.length === 0 ? (
            <p className="text-center mt-10 font-noto text-stone-600">受け取り所はまだ登録されていません</p>
          ) : (
            <ul className="mt-5 space-y-4">
              {receivingPoints.map((point) => (
                <li key={point.id} className="border p-4 rounded shadow flex justify-between items-start">
                  <div>
                    <p className="font-noto font-semibold">{point.name}</p>
                    <p className="font-noto text-sm text-gray-600">{point.address}</p>
                    <p className="text-xs text-gray-500">
                      緯度: {point.latitude} / 経度: {point.longitude}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(point.id)}
                    className="text-sm text-red-600 hover:text-red-700 transition underline cursor-pointer"
                  >
                    削除
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
