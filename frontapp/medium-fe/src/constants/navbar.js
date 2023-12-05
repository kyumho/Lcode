import { FiSearch } from 'react-icons/fi';
import { FiMenu } from 'react-icons/fi';
import { FiShoppingCart } from 'react-icons/fi';

export const navMenuType = {
  dropdown: { btnClass: 'lg:hidden' },
  avatar: { btnClass: 'avatar' },
};

export const navSvgType = {
  dropdown: {
    svgClass: 'inline-block w-5 h-5 stroke-current',
    path: 'M4 6h16M4 12h16M4 18h16',
    link: '',
  },
  search: {
    svgClass: 'h-5 w-5',
    path: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    link: '/search',
  },
  cart: {
    svgClass: 'h-5 w-5',
    path: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
    link: '/products/cart',
  },
};

export const navIconType = {
  dropdown: {
    icon: <FiMenu size={25} />,
    link: '',
  },
  search: {
    icon: <FiSearch size={20} />,
    link: '/search',
  },
  cart: {
    icon: <FiShoppingCart size={23} />,
    link: '/products/cart',
  },
};

export const navDefaultMenus = [
  { id: 1, title: '상품', link: '/products' },
  { id: 2, title: '커뮤니티', link: '/community' },
];

export const navAvatarMenus = [
  {
    id: 1,
    title: '마이페이지',
    link: '/mypage',
  },
  {
    id: 2,
    title: '로그아웃',
    link: '',
  },
];
