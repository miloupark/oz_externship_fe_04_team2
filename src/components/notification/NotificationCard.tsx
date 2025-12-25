import { getTypeIcon } from '@/components/notification/icons'
import type { AccentKey, AlarmIconType } from '@/types'

type NotificationCardProps = {
  message: string
  date: string
  isRead?: boolean
  accent?: AccentKey
  iconType?: AlarmIconType
  onClick?: () => void
}

const accentClasses: Record<AccentKey, string> = {
  blue: 'accent-blue',
  green: 'accent-green',
  red: 'accent-red',
  purple: 'accent-purple',
  orange: 'accent-orange',
  indigo: 'accent-indigo',
  pink: 'accent-pink',
  teal: 'accent-teal',
}

export function NotificationCard({
  message,
  date,
  isRead = false,
  accent = 'blue',
  iconType = 'apply',
  onClick,
}: NotificationCardProps) {
  const icon = getTypeIcon(iconType)

  return (
    <div
      className={`border-custom-gray-100 relative flex items-start gap-3 border-b p-4 last:border-b-0 ${
        isRead ? 'bg-white' : 'bg-[#fefce8]'
      } ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${accentClasses[accent]}`}
      >
        {icon}
      </div>
      <div className="pr-6">
        <p className="text-custom-gray-800 mb-1 line-clamp-2 text-sm leading-5">
          {message}
        </p>
        <span className="text-custom-gray-500 text-xs">{date}</span>
      </div>
      {!isRead && (
        <span className="bg-primary-500 absolute top-1/4 right-3 h-2.5 w-2.5 -translate-y-1/2 rounded-full" />
      )}
    </div>
  )
}
