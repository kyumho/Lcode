import Link from 'next/link';
import { navAvatarMenus } from '@/constants/navbar';

export default function AvatarMenu({ setIsMenuOpen, setLogin }) {
  return (
    <>
      {/* {navAvatarMenus.map((menu) => (
        <li key={menu.id} onClick={() => setIsMenuOpen(false)}>
          <Link href={menu.link}>{menu.title}</Link>
        </li>
      ))} */}
      <li onClick={() => setIsMenuOpen(false)}>
        <Link href='/mypage'>마이페이지</Link>
      </li>
      <li onClick={() => setIsMenuOpen(false)}>
        <Link href='/products/cart'>장바구니</Link>
      </li>
      <li onClick={() => setIsMenuOpen(false)}>
        <a onClick={() => setLogin(false)}>로그아웃</a>
      </li>
    </>
  );
}
