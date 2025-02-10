'use client';

import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const handleHome = () => {
    router.push('/home');
  };
  const handleOrder = () => {
    router.push('/order');
  };
  return (
    <>
      <h1>カートページです</h1>
      <ul>
        <li>
          <a onClick={handleHome}>ホームページへ</a>
        </li>
        <li>
          <a onClick={handleOrder}>購入ページへ</a>
        </li>
      </ul>
    </>
  );
};

export default Page;
