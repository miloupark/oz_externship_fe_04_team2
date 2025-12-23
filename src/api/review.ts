import { API_PATHS } from '@/constants'
import { axiosInstance } from '@/api'

interface ReviewPayload {
  star_rating: number
  content: string
}

export async function createReview(studyId: number, data: ReviewPayload) {
  const res = await axiosInstance.post(API_PATHS.REVIEW.LIST(studyId), data)
  return res.data
}

export async function updateReview(
  studyId: number,
  reviewId: number,
  data: ReviewPayload
) {
  const res = await axiosInstance.patch(
    API_PATHS.REVIEW.DETAIL(studyId, reviewId),
    data
  )
  return res.data
}
