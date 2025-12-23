import { getUserInformationApi } from '@/api'
import { LoginStateStore } from '@/store'
import type { UserInformation } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useUserData = () => {
  const loginState = LoginStateStore((state) => state.loginState)
  return useQuery<UserInformation>({
    queryKey: ['userData'],
    queryFn: getUserInformationApi,
    enabled: loginState === 'USER',
  })
}
