import '../styles/globals.css'
import Navbar from '@/components/ui/Navbar'
import TanstackProvider from '@/context/TanStackProvider'

export const metadata = {
  title: {
    default: 'LCODE',
    template: '%s | LCODE',
  },
  description: 'home',
}

export default function RootLayout({ children }) {
  /* const res = await axios.get('/check');
  console.dir(res); */

  return (
    <html lang='ko'>
      <body className='w-full sm:bg-neutral-50 overflow-auto font-jalnan'>
        <TanstackProvider>
          <header className='sticky top-0 bg-white border-b z-[999]'>
            <div>
              <Navbar />
            </div>
          </header>
          <main className='w-full max-w-screen-xl mx-auto'>{children}</main>
        </TanstackProvider>
      </body>
    </html>
  )
}
