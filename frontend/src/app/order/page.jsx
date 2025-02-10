'use client';

import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const handleHome = () => {
    router.push('/home');
  };
  const handleComplete = () => {
    router.push('/complete');
  };
  return (
    <>
      <h1>購入ページです</h1>
      <ul>
        <li>
          <a onClick={handleHome}>ホームページへ</a>
        </li>
        <li>
          <a onClick={handleComplete}>購入完了ページへ</a>
        </li>
      </ul>
    </>
  );
};

export default Page;
