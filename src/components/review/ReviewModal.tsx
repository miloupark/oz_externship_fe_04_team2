import { useEffect, useState } from 'react'
import { Button, Modal } from '@/components/common'
import { StarRating } from '@/components/review'
import { useStudyGroupStore } from '@/store'
import { useReviewMutation } from '@/hooks/review'
import { formatYearMonthDay } from '@/utils'

export function ReviewModal() {
  const { selectedStudy, selectedReview, modal, closeModal } =
    useStudyGroupStore()

  const [rating, setRating] = useState(0)
  const [content, setContent] = useState('')

  const mutation = useReviewMutation(selectedStudy!.id)

  useEffect(() => {
    if (modal !== 'edit') return
    if (selectedReview) {
      setRating(selectedReview.star_rating ?? 0)
      setContent(selectedReview.content ?? '')
    } else {
      setRating(0)
      setContent('')
    }
  }, [selectedReview, modal])

  if (!selectedStudy) return null

  const handleSubmit = () => {
    mutation.mutate(
      {
        reviewId: selectedReview?.id,
        star_rating: rating,
        content,
      },
      {
        onSuccess: () => {
          closeModal()
        },
      }
    )
  }

  return (
    <Modal
      isOpen={modal === 'edit'}
      onClose={closeModal}
      title="리뷰 작성"
      wrapperClassName="h-auto max-w-[600px] bg-white rounded-xl p-0 m-4"
      innerClassName="justify-start items-stretch p-8 gap-4 mb-0"
      titleClassName="justify-between flex items-center px-6 pt-6 mb-0"
    >
      <div className="pb-4">
        <h1 className="text-custom-gray-900 text-base font-medium">
          {selectedStudy.name}
        </h1>
        <p className="text-custom-gray-500 mt-2 text-sm">
          {formatYearMonthDay(selectedStudy.start_at)} ~{' '}
          {formatYearMonthDay(selectedStudy.end_at)}
        </p>
      </div>
      <div className="py-2">
        <label className="text-custom-gray-900 mb-2 block text-sm font-medium">
          별점 <span className="text-danger-500">*</span>
        </label>
        <StarRating
          rating={rating}
          onRatingChange={setRating}
          size={28}
          className="gap-2"
        />
      </div>
      <div>
        <label className="text-custom-gray-900 mb-2 block text-sm font-medium">
          리뷰 내용 <span className="text-danger-500">*</span>
        </label>
        <textarea
          className="border-custom-gray-300 placeholder:text-custom-gray-400 text-custom-gray-900 focus:border-primary-500 focus:ring-primary-500 h-32 w-full resize-none rounded-lg border px-3 py-2 focus:ring-1 focus:outline-none"
          placeholder="스터디에 대한 솔직한 후기를 남겨주세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={500}
        />
        <div className="text-custom-gray-400 mt-1 text-xs">
          {content.length}/500자
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <Button variant="outline" className="flex-1" onClick={closeModal}>
          취소
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          disabled={content.length === 0 || mutation.isPending}
          onClick={handleSubmit}
        >
          {mutation.isPending
            ? '저장 중...'
            : selectedReview
              ? '수정 완료'
              : '작성 완료'}
        </Button>
      </div>
    </Modal>
  )
}
