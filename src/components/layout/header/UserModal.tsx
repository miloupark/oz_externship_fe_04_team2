import { logout } from '@/api'
import { EXTERNAL_LINKS } from '@/constants'
import { LoginStateStore } from '@/store'
import AuthStateStore from '@/store/authStateStore'
import { LogOutIcon, UserRound } from 'lucide-react'

export function UserModal() {
  const loginState = LoginStateStore((state) => state.setLoginState)

  return (
    <div className="md:border-custom-gray-200 hidden md:absolute md:top-[45.05px] md:right-2.5 md:flex md:h-24 md:w-48 md:flex-col md:gap-1 md:rounded-lg md:border md:border-solid md:bg-white md:drop-shadow-[0_10px_15px_rgba(0,0,0,0.2)]">
      <a
        className="text-custom-gray-700 mt-3 flex cursor-pointer items-center gap-3 px-4 py-1.5 pt-[5px]"
        onClick={async () => {
          await logout()
          AuthStateStore.getState().setAccessToken(null)
          loginState('GUEST')
        }}
        href={EXTERNAL_LINKS.MAIN_PAGE}
      >
        <LogOutIcon className="h-4 w-4" />
        <span>로그아웃</span>
        {/* 클릭하면 로그아웃 시키기 */}
      </a>
      <a
        href={EXTERNAL_LINKS.MY_PAGE}
        className="text-custom-gray-700 flex cursor-pointer items-center gap-3 px-4 py-1.5"
      >
        <UserRound className="h-4 w-4" />
        <span>마이페이지</span>
        {/* 클릭하면 마이페이지로 이동 */}
      </a>
    </div>
  )
}
