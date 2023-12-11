import MyPageSidebar from '@/components/MyPageSidebar'

export default function MyPageLayout({ children }) {
  return (
    <div className='flex'>
      <MyPageSidebar />
      <div className='py-8 px-8'>{children}</div>
    </div>
  )
}
