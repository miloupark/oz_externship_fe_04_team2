import type {
  LectureApiResponse,
  StudyGroupLectureSelectionType,
} from '@/types'

export function mapLectureToSelection(
  l: LectureApiResponse
): StudyGroupLectureSelectionType {
  return {
    id: l.id,
    title: l.title,
    instructor: l.instructor,
    total_class_time: l.total_class_time,
    discounted_price: l.discounted_price,
    thumbnail_img_url: l.thumbnail_img_url,
    platform: l.platform,
  }
}
