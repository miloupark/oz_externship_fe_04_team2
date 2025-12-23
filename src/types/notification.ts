export type AccentKey =
  | 'blue'
  | 'green'
  | 'red'
  | 'purple'
  | 'orange'
  | 'indigo'
  | 'pink'
  | 'teal'

export type AlarmIconType =
  | 'apply'
  | 'approved'
  | 'rejected'
  | 'newMember'
  | 'studyEnd'
  | 'upcoming'
  | 'today'
  | 'note'

export type AlarmItem = {
  id: string
  message: string
  date: string
  isRead: boolean
  accent: AccentKey
  iconType: AlarmIconType
}

export type NotificationApiItem = {
  id: number
  type: string
  content: string
  back_url_link: string
  is_read: boolean
  created_at: string
}

export type NotificationListResponse = {
  results: NotificationApiItem[]
  total_count: number
  unread_count: number
}
