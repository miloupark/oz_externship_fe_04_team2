import { fetchChatRooms } from '@/api'
import { useChatStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export function useChatRooms() {
  const isOpen = useChatStore((state) => state.isOpen)

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['chatRooms'],
    queryFn: () => fetchChatRooms({ page_size: 10 }),
    enabled: isOpen,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  return {
    chatRooms: data?.results || [],
    isLoading,
    isError,
    error,
    refetch,
  }
}
