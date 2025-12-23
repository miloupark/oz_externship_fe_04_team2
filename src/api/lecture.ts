import { API_PATHS } from '@/constants'
import { axiosInstance } from '@/api/axios'
import { mapLectureToSelection } from '@/lib/lecture'
import type {
  LectureApiResponse,
  StudyGroupLectureSelectionType,
} from '@/types'

export async function getLectures(): Promise<StudyGroupLectureSelectionType[]> {
  const { data } = await axiosInstance.get<{
    results: LectureApiResponse[]
  }>(API_PATHS.STUDYGROUP.LECTURES)

  return data.results.map(mapLectureToSelection)
}
