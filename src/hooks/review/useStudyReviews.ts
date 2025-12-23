import { getStudyReviews } from '@/api'
import type { StudyGroupReviewType } from '@/types'
import { ApiError } from '@/utils'
import { useQuery } from '@tanstack/react-query'

export function useStudyReviews(studyId: number) {
  return useQuery<StudyGroupReviewType[]>({
    queryKey: ['studyReviews', studyId],
    queryFn: () => getStudyReviews(studyId),
    enabled: !!studyId,
    throwOnError: (error) => error instanceof ApiError && error.status >= 500,
  })
}
