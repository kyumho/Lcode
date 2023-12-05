import { navIconType } from '@/constants/navbar';
import Link from 'next/link';

export default function NavbarIconBtn({ menu }) {
  const type = navIconType[menu];

  return (
    <Link href={type.link}>
      <label className='btn btn-ghost btn-circle'>{type.icon}</label>
    </Link>
  );
}
