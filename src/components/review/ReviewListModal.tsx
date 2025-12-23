import { Button, Modal } from '@/components/common'
import { Loading } from '@/components/fallback-ui'
import { StarRating } from '@/components/review'
import { useStudyReviews } from '@/hooks/review'
import { useStudyGroupStore } from '@/store'
import { formatDotDate } from '@/utils'
import type { StudyGroupReviewType } from '@/types'

export function ReviewListModal() {
  const { selectedStudy, modal, openReviewCreate, openReviewEdit, closeModal } =
    useStudyGroupStore()
  const { data: reviews = [], isLoading } = useStudyReviews(
    selectedStudy!.id ?? 0
  )

  if (!selectedStudy) return null

  if (isLoading) {
    return (
      <Modal isOpen={modal === 'list'} onClose={closeModal} title="스터디 리뷰">
        <Loading />
      </Modal>
    )
  }

  const total = reviews.length
  const average =
    total === 0
      ? 0
      : reviews.reduce(
          (sum: number, r: StudyGroupReviewType) => sum + r.star_rating,
          0
        ) / total

  const myReview = reviews.find((r: StudyGroupReviewType) => r.is_mine)

  return (
    <Modal
      isOpen={modal === 'list'}
      onClose={closeModal}
      title="스터디 리뷰"
      wrapperClassName="max-w-[600px] bg-white p-0 m-4"
      innerClassName="items-stretch justify-start p-0 gap-0 overflow-hidden mb-0"
      titleClassName="flex items-center justify-between px-6 pt-6 pb-2 mb-0"
    >
      <div className="border-custom-gray-100 px-6 pb-6">
        <p className="text-custom-gray-500 text-xs">{selectedStudy.name}</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2">
            <StarRating rating={Math.round(average)} readonly size={24} />
            <span className="text-custom-gray-900 text-2xl font-bold">
              {average}
            </span>
          </div>
          <div className="text-custom-gray-400 text-sm">
            총 {total}개의 리뷰
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-custom-gray-100 border-b pb-6 last:border-0 last:pb-0"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StarRating rating={review.star_rating} readonly size={14} />
                  <span className="text-custom-gray-900 text-sm font-bold">
                    {review.star_rating}/5
                  </span>
                  {review.is_mine && (
                    <span className="bg-primary-100 text-primary-700 rounded px-1.5 py-0.5 text-[10px] font-bold">
                      내 리뷰
                    </span>
                  )}
                </div>
                <span className="text-custom-gray-400 text-xs">
                  {review.created_at ? formatDotDate(review.created_at) : ''}
                </span>
              </div>
              <p className="text-custom-gray-700 text-sm leading-relaxed">
                {review.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="border-custom-gray-100 border-t p-6">
        <Button
          variant="primary"
          className="w-full font-bold"
          onClick={() => {
            if (myReview) openReviewEdit(selectedStudy, myReview)
            else if (selectedStudy) openReviewCreate(selectedStudy)
          }}
        >
          내 리뷰 수정하기
        </Button>
      </div>
    </Modal>
  )
}
