import type { IconName } from '@/components/notification'

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
  | 'open'
  | 'total'
  | 'closed'

export type AlarmItem = {
  id: string
  message: string
  date: string
  isRead: boolean
  accent: AccentKey
  iconType: IconName
  backUrl?: string
}

export type NotificationApiItem = {
  id: number
  type:
    | 'STUDY_NOTE_CREATE'
    | 'TODAY_SCHEDULE'
    | 'UPCOMING_SCHEDULE'
    | 'STUDY_JOIN'
    | 'APPLICATION_CREATED'
    | 'APPLICATION_ACCEPT'
    | 'APPLICATION_REJECT'
    | 'STUDY_REVIEW_REQUEST'
  content: string
  back_url_link: string
  is_read: boolean
  created_at: string
}

export type NotificationListResponse = {
  results: NotificationApiItem[]
  next: string | null
  previous: string | null
  total?: number
  unread_total?: number
}
