'use client';

import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const handleHome = () => {
    router.push('/home');
  };
  const handleDetail = () => {
    router.push('/detail');
  };
  return (
    <>
      <h1>一覧ページです</h1>
      <ul>
        <li>
          <a onClick={handleHome}>ホームページへ</a>
        </li>
        <li>
          <a onClick={handleDetail}>詳細ページへ</a>
        </li>
      </ul>
    </>
  );
};

export default Page;
