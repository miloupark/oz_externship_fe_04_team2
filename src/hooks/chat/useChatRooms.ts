import { fetchChatRooms } from '@/api'
import { useChatStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export function useChatRooms() {
  const isOpen = useChatStore((state) => state.isOpen)

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['chatRooms'],
    queryFn: () => fetchChatRooms({ page_size: 10 }),
    enabled: true,
    staleTime: 1000,
    refetchOnWindowFocus: false,
    refetchInterval: isOpen ? false : 60 * 1000,
  })

  return {
    chatRooms: data?.results || [],
    isLoading,
    isError,
    error,
    refetch,
  }
}
