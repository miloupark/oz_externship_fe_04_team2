import {
  ChatHeader,
  ChatMessageList,
  ChatParticipants,
  ChatRoomInput,
} from '@/components/chat'
import { useInfiniteChatMessages, useMarkChatRoomAsRead } from '@/hooks'
import type { ChatParticipant } from '@/types'
import { useEffect } from 'react'

interface ChatRoomPanelProps {
  groupId: number
  roomName: string
  participants: ChatParticipant[]
  currentUserId: number
  onClose: () => void
  onSend: (message: string) => void
  onBack: () => void
}

export function ChatRoomPanel({
  groupId,
  roomName,
  participants,
  currentUserId,
  onClose,
  onSend,
  onBack,
}: ChatRoomPanelProps) {
  const { messages, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteChatMessages(groupId)
  const { mutate: markAsRead } = useMarkChatRoomAsRead(groupId)

  useEffect(() => {
    markAsRead()
  }, [markAsRead])

  const onlineCount = participants.filter(
    (participant) => participant.is_online
  ).length

  return (
    <div className="flex h-full flex-col">
      <ChatHeader
        title={roomName}
        onlineCount={onlineCount}
        onClose={onClose}
        onBack={onBack}
        showBackButton
      />
      <ChatParticipants members={participants} />
      <ChatMessageList
        messages={messages}
        currentUserId={currentUserId}
        onLoadMore={fetchNextPage}
        hasMore={hasNextPage}
        isLoadingMore={isFetchingNextPage}
      />
      <ChatRoomInput onSend={onSend} />
    </div>
  )
}
