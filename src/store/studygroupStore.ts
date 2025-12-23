import { create } from 'zustand'
import type { StudyGroupResponseType, StudyGroupReviewType } from '@/types'
import type { ApiError } from '@/utils'
import { getStudyGroups } from '@/api'

interface StudyGroupState {
  studies: StudyGroupResponseType[]
  selectedStudy: StudyGroupResponseType | null
  modal: 'none' | 'list' | 'edit'
  reviews: StudyGroupReviewType[]
  selectedReview: StudyGroupReviewType | null
  reviewStats: { average: number; total: number }
  isLoading: boolean
  error: ApiError | null

  fetchStudies: () => Promise<void>
  openReviewList: (study: StudyGroupResponseType) => Promise<void>
  openReviewCreate: (study: StudyGroupResponseType) => void
  openReviewEdit: (
    study: StudyGroupResponseType,
    review: StudyGroupReviewType
  ) => void
  closeModal: () => void
}

export const useStudyGroupStore = create<StudyGroupState>((set) => ({
  studies: [],
  selectedStudy: null,
  modal: 'none',
  reviews: [],
  selectedReview: null,
  reviewStats: { average: 0, total: 0 },
  isLoading: false,
  error: null,

  fetchStudies: async () => {
    set({ isLoading: true, error: null })

    try {
      const data = await getStudyGroups()
      set({ studies: data })
    } catch (e) {
      set({ error: e as ApiError })
      throw e
    } finally {
      set({ isLoading: false })
    }
  },

  openReviewList: async (study) => {
    set({ selectedStudy: study, selectedReview: null, modal: 'list' })
  },

  openReviewCreate(study) {
    set({ selectedStudy: study, selectedReview: null, modal: 'edit' })
  },

  openReviewEdit: (study, review) => {
    set({ selectedStudy: study, selectedReview: review, modal: 'edit' })
  },

  closeModal: () =>
    set({ modal: 'none', selectedStudy: null, selectedReview: null }),
}))
