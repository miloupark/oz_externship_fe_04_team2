import { cn } from '@/lib'
import { Link } from 'react-router'

interface StudyCardThumbnailProps {
  groupId: number
  image: string
  name: string
  statusBadge: string
  statusColor: string
  roleBadge: string | undefined
  memberCount: string
}

export function StudyCardThumbnail({
  groupId,
  image,
  name,
  statusBadge,
  statusColor,
  roleBadge,
  memberCount,
}: StudyCardThumbnailProps) {
  return (
    <Link to={`/${groupId}`}>
      <div className="bg-custom-gray-100 relative w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="aspect-video h-56 w-full object-cover transition-transform duration-300"
        />
        <span
          className={cn(
            'absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-medium text-white',
            statusColor
          )}
        >
          {statusBadge}
        </span>
        {roleBadge && (
          <span className="bg-primary-400 absolute top-3 right-3 rounded-full px-2 py-1 text-xs font-medium text-white">
            {roleBadge}
          </span>
        )}
        <div className="text-custom-gray-900 absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/60 px-3 py-1 backdrop-blur-sm">
          <span className="text-custom-gray-900 text-sm font-medium">
            {memberCount}
          </span>
        </div>
      </div>
    </Link>
  )
}
