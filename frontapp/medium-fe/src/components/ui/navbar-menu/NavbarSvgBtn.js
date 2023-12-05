import Link from 'next/link';
import { navSvgType } from '@/constants/navbar';

export default function NavbarSvgBtn({ menu }) {
  const type = navSvgType[menu];

  console.log(type);

  return (
    <Link href={type.link}>
      <button className='btn btn-ghost btn-circle'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          className={type.svgClass}
          {...((menu === 'search' || menu === 'cart') && {
            stroke: 'currentColor',
          })}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d={type.path}
          ></path>
        </svg>
      </button>
    </Link>
  );
}
