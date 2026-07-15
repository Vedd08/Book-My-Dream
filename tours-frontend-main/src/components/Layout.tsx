import { Outlet, useLocation } from 'react-router-dom'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import WhatsAppButton from './WhatsAppButton'
import { useEffect } from 'react'

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <SiteHeader />
      <Outlet />
      {pathname !== '/gallery' && <SiteFooter />}
      <WhatsAppButton />
    </>
  )
}
