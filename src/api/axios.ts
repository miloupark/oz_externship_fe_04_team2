import { refreshAccessToken } from '@/api/auth/login'
import { API_BASE_URL } from '@/constants'
import { LoginStateStore } from '@/store'
import AuthStateStore from '@/store/authStateStore'
import { ApiError } from '@/utils'
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 시 accessToken이 있으면 Authorization 헤더에 자동으로 추가
axiosInstance.interceptors.request.use((config) => {
  const token = AuthStateStore.getState().accessToken
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // 401이고 재시도 아닐 때만
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // 엑세스 토큰 재발급
        const { data } = await refreshAccessToken()
        const newToken = data.access_token

        AuthStateStore.getState().setAccessToken(newToken)

        originalRequest.headers = originalRequest.headers ?? {}
        originalRequest.headers.Authorization = `Bearer ${newToken}`

        return axiosInstance(originalRequest)
      } catch {
        // 갱신 실패 시 토큰 제거
        AuthStateStore.getState().clearAuth()
        LoginStateStore.getState().setLoginState('GUEST')
      }
    }

    if (error.response) {
      const { status, data } = error.response
      return Promise.reject(
        new ApiError(
          status,
          data?.message || '요청에 실패했습니다',
          data?.error_detail,
          data
        )
      )
    }

    return Promise.reject(new ApiError(0, '네트워크 오류가 발생했습니다'))
  }
)
