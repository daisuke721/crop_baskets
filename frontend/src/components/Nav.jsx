import Link from 'next/link';
import React from 'react';

const Nav = () => {
  return (
    <>
      <div className="py-8 px-10">
        <div className="flex flex-row-reverse">
          <Link href="/create">
            <button className="py-3 px-7 font-roboto bg-honey text-white text-2xl rounded-lg hover:bg-yellow-500">
              出品
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Nav;
