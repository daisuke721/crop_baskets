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
  const handleCart = () => {
    router.push('/cart');
  };
  return (
    <>
      <h1>詳細ページです</h1>
      <ul>
        <li>
          <a onClick={handleHome}>ホームページへ</a>
        </li>
        <li>
          <a onClick={handleOrder}>購入ページへ</a>
        </li>
        <li>
          <a onClick={handleCart}>カートページへ</a>
        </li>
      </ul>
    </>
  );
};

export default Page;
