'use client';

import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const handleHome = () => {
    router.push('/home');
  };
  return (
    <>
      <h1>購入完了ページです</h1>
      <a onClick={handleHome}>ホームページへ</a>
    </>
  );
};

export default Page;
