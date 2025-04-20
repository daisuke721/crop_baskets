'use client';

import { Suspense } from 'react';
import { CheckoutContent } from './CheckoutContent';

const Page = () => {
  return (
    <>
      <Suspense fallback={<div>読み込み中...</div>}>
        <CheckoutContent />
      </Suspense>
    </>
  );
};

export default Page;
