import { ChatListItem } from '@/components/chat'
import type { ChatRoomListItem } from '@/types'

interface ChatListProps {
  rooms: ChatRoomListItem[]
  onSelectRoom: (roomId: number) => void
}

export function ChatList({ rooms, onSelectRoom }: ChatListProps) {
  return (
    <ul>
      {rooms.map((chatRoom) => (
        <ChatListItem
          key={chatRoom.group_id}
          chatRoom={chatRoom}
          onClick={onSelectRoom}
        />
      ))}
    </ul>
  )
}
