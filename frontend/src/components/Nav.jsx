import Link from 'next/link';
import React from 'react';
import { FaCarrot } from 'react-icons/fa';

const Nav = () => {
  return (
    <>
      <div className="py-8 px-5">
        <div className="flex flex-row-reverse">
          <Link href="/create">
            <div className="flex font-noto py-3 pl-8 pr-6 bg-honey text-white text-2xl rounded-full hover:bg-yellow-500">
              <p>出品</p>
              <FaCarrot style={{ transform: 'rotate(-45deg)' }} />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Nav;
