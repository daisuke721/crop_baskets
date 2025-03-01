'use client';

import { useRouter } from 'next/navigation';
import Nav from '../../components/Nav';

const Page = () => {
  const router = useRouter();
  const handleCreate = () => {
    router.push('/create');
  };
  const handleDetail = () => {
    router.push('/detail');
  };
  const handleList = () => {
    router.push('/List');
  };
  const handleCart = () => {
    router.push('/cart');
  };

  return (
    <>
      <Nav />
      <h1 className="font-noto">ホームページです</h1>
      <ul>
        <li>
          <a onClick={handleCreate}>出品ページへ</a>
        </li>
        <li>
          <a onClick={handleDetail}>詳細ページへ</a>
        </li>
        <li>
          <a onClick={handleList}>一覧ページへ</a>
        </li>
        <li>
          <a onClick={handleCart}>カートページへ</a>
        </li>
      </ul>
    </>
  );
};

export default Page;
