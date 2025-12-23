import { ChatWidget } from '@/components/chat'
import { Footer, Header } from '@/components/layout'
import { ScrollToTop } from '@/hooks'
import { LoginStateStore } from '@/store'
import AuthStateStore from '@/store/authStateStore'
import { useState } from 'react'
import { Outlet } from 'react-router'

export function Layout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const loginState = LoginStateStore((state) => state.loginState)
  const accessToken = AuthStateStore((state) => state.accessToken)

  const isLoggedIn = loginState === 'USER' || !!accessToken

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Header
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <main className="container-1280 mt-16 min-h-screen grow">
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
      {isSideBarOpen && (
        <div className="fixed top-0 left-0 h-full w-full bg-black opacity-50 md:hidden"></div>
      )}
      {/* 로그인된 사용자에게만 위젯 노출 */}
      {isLoggedIn && <ChatWidget />}
    </div>
  )
}
