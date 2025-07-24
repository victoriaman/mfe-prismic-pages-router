import React, { useState } from 'react';

interface HeaderProps {
  initializeCounter?: number;
}
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? process.env.NEXT_PUBLIC_PRODUCTION_PATH : '';

const Header: React.FC<HeaderProps> = ({initializeCounter = 0}) => {
  const [count, setCount] = useState(initializeCounter);

   const handleClick = () => {
    setCount(prev => prev + 1);
  };

  return (
    <header>
      <h1 className='text-lime-300'>Next.js 15 Micro Frontend Header Auto update {count}</h1>
      <button onClick={handleClick}>Increment +1</button>
      <img
        src={`${basePath}/next.svg`}
        alt="Next.js Logo"
        className="dark:invert"
        width={180}
        height={37} />
    </header>
  );
};
export default Header;

