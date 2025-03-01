import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { BsCart } from 'react-icons/bs';
import { CiMenuBurger } from 'react-icons/ci';

const Header = () => {
  return (
    <>
      <header className="h-28 w-full border-b flex justify-between items-center">
        <div className="flex place-items-center px-5">
          <h1>
            <Link href="/home">
              <Image src="/logo.png" alt="Crop Baskets" width={150} height={100} />
            </Link>
          </h1>
        </div>
        <div className="flex mx-10">
          <div>
            <Link href="/cart">
              <BsCart className="text-3xl text-sprayGreen" />
            </Link>
          </div>
          <div className="px-5 text-xl text-sprayGreen">|</div>
          <div>
            <CiMenuBurger className="text-3xl text-sprayGreen" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
