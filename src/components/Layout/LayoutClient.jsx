import Header from '../Shared/Header'
import Footer from '../Shared/Footer'
import { Outlet } from 'react-router'

const LayoutClient = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
)

export default LayoutClient
