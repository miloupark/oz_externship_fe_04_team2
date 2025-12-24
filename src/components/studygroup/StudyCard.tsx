import {
  StudyCardContent,
  StudyCardFooter,
  StudyCardThumbnail,
} from '@/components/studygroup'
import { useStudyGroupStore } from '@/store'
import type { StudyGroupResponseType, StudyGroupReviewType } from '@/types'
import { formatYearMonthDay } from '@/utils'
import { Link } from 'react-router'

export interface StudyCardProps {
  study: StudyGroupResponseType
}

export function StudyCard({ study }: StudyCardProps) {
  const { openReviewCreate, openReviewEdit, openReviewList } =
    useStudyGroupStore()

  const myReview = study.reviews.find((r: StudyGroupReviewType) => r.is_mine)

  return (
    <Link to={`/${study.id}`}>
      <div className="border-custom-gray-200 flex h-[600px] flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
        <StudyCardThumbnail
          image={study.profile_img_url || '/defaultUser.svg'}
          name={study.name}
          statusBadge={
            study.status === 'PENDING'
              ? '대기중'
              : study.status === 'ONGOING'
                ? '진행중'
                : '종료됨'
          }
          statusColor={
            study.status === 'ONGOING'
              ? 'bg-success-500'
              : study.status === 'ENDED'
                ? 'bg-danger-500'
                : 'bg-custom-gray-500'
          }
          roleBadge={study.is_leader ? '리더' : undefined}
          memberCount={`${study.current_headcount}/${study.max_headcount}명`}
        />
        <div className="flex flex-1 flex-col p-5">
          <StudyCardContent
            name={study.name}
            dateRange={`${formatYearMonthDay(study.start_at)} ~ ${formatYearMonthDay(study.end_at)}`}
            lectures={study.lectures}
          />
          <StudyCardFooter
            groupId={study.id}
            variant={study.status === 'ENDED' ? 'completed' : 'default'}
            rating={myReview?.star_rating || 0}
            reviewStatus={myReview ? 'done' : 'none'}
            onActionClick={() => {
              if (myReview) openReviewEdit(study, myReview)
              else openReviewCreate(study)
            }}
            onDetailClick={() => openReviewList(study)}
          />
        </div>
      </div>
    </Link>
  )
}
