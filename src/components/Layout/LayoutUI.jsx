import Header from '../Shared/Header'
import Footer from '../Shared/Footer'
import { Outlet, useLocation } from 'react-router'

const LayoutUI = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-grow ${isHomePage ? 'pt-0' : 'pt-[104px] lg:pt-[72px]'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default LayoutUI
