import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <>
      <header className="h-16 w-full border-b border-b-gray-100">
        <h1 className="flex justify-center py-2">
          <Link href="/">
            <Image src="/crop-baskets-logo.png" alt="Crop Baskets" width={150} height={50} />
          </Link>
        </h1>
      </header>
    </>
  );
};

export default Header;
