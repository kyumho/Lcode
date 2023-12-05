import Image from 'next/image';

export default function NavbarImageBtn() {
  return (
    <div className='w-10 rounded-full'>
      <Image
        alt='Tailwind CSS Navbar component'
        src='/images/stock/photo-1534528741775-53994a69daeb.jpg'
        width={50}
        height={50}
      />
    </div>
  );
}
