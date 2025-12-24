import { ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/common'
import { cn } from '@/lib'
import { Link } from 'react-router'

interface StudyCardFooterProps {
  groupId: number
  variant: 'completed' | 'default'
  rating: number
  reviewStatus: string
  onActionClick: (groupId: number) => void
  onDetailClick: (groupId: number) => void
}

export function StudyCardFooter({
  groupId,
  variant,
  rating,
  reviewStatus,
  onActionClick,
  onDetailClick,
}: StudyCardFooterProps) {
  if (variant === 'default') {
    return (
      <div className="border-custom-gray-100 mt-auto flex justify-end border-t pt-3">
        <button className="text-primary-600 hover:text-primary-700 flex items-center gap-1.5 text-xs font-medium transition-colors">
          자세히 보기 <ArrowRight size={14} className="mb-0.5" />
        </button>
      </div>
    )
  }

  return (
    <div className="mt-auto space-y-3 pt-5">
      <div className="border-custom-gray-100 flex items-center justify-between border-t pt-3">
        <div className="flex items-center gap-1">
          <span className="text-custom-gray-700 text-xs font-bold">
            스터디 리뷰
          </span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  'h-3 w-3',
                  star <= (rating || 0)
                    ? 'fill-primary-400 text-primary-400'
                    : 'text-custom-gray-200 fill-gray-200'
                )}
              />
            ))}
          </div>
          <span className="text-custom-gray-400 text-xs">({rating})</span>
        </div>
        <button
          className="text-custom-gray-400 hover:text-custom-gray-600 text-xs underline"
          onClick={() => onDetailClick(groupId)}
        >
          상세보기
        </button>
      </div>

      <Button
        variant={reviewStatus === 'done' ? 'secondary' : 'primary'}
        className={cn(
          'w-full font-bold',
          reviewStatus === 'done' && 'text-custom-gray-500 bg-custom-gray-100'
        )}
        onClick={() => {
          onActionClick(groupId)
        }}
      >
        {reviewStatus === 'done' ? '리뷰 수정하기' : '리뷰 작성하기'}
      </Button>
    </div>
  )
}
