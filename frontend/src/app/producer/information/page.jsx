'use client';

import { useEffect, useState } from 'react';
import { fetchMyProducerInformation } from '../../../lib/api/producerInformations';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await fetchMyProducerInformation();
      setInfo(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="p-6">読み込み中...</div>;

  return (
    <>
      <div className="content-area">
        <div className="p-6 space-y-4">
          <h1 className="text-xl font-noto font-bold text-center">生産者情報</h1>
          {info ? (
            <div>
              {info.image_url && (
                <img src={info.image_url} alt="プロフィール画像" className="w-32 h-32 object-cover rounded mb-4" />
              )}
              <p>名前: {info.name}</p>
              <p>コメント: {info.comment}</p>
              <button
                onClick={() => router.push('/producer/information/edit')}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                編集する
              </button>
            </div>
          ) : (
            <div>
              <p className="text-stone-600">プロフィールは未登録です。</p>
              <button
                onClick={() => router.push('/producer/profile/edit')}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                新規作成へ
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
