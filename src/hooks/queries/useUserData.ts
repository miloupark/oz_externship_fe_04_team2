import { getUserInformationApi } from '@/api'
import { LoginStateStore } from '@/store'
import AuthStateStore from '@/store/authStateStore'
import type { UserInformation } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useUserData = () => {
  const loginState = LoginStateStore((state) => state.loginState)
  const accessToken = AuthStateStore((state) => state.accessToken)
  const isLoggedIn = loginState === 'USER' || !!accessToken

  return useQuery<UserInformation>({
    queryKey: ['userData'],
    queryFn: getUserInformationApi,
    enabled: isLoggedIn,
  })
}
