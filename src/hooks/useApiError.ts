import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ApiError } from '@/utils'
import { EXTERNAL_LINKS } from '@/constants'
import { showToast } from '@/lib'

export function useApiError(error: unknown) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!(error instanceof ApiError)) return

    if (error.status === 401) {
      showToast.error('에러!', '로그인이 필요합니다')
      window.location.replace(EXTERNAL_LINKS.LOGIN)
    }

    if (error.status === 403) {
      showToast.error('에러!', '접근 권한이 없습니다')
      navigate(-1)
    }
  }, [error, navigate])
}
