import { getStudyScheduleDetail } from '@/api'
import type { StudyScheduleDetailType } from '@/types'
import { useQuery } from '@tanstack/react-query'

// 스터디 스케줄 상세 조회
export const useStudyScheduleDetail = (
  groupId: number | string,
  scheduleId: number | string | null,
  enabled = true
) => {
  const canFetch = enabled && scheduleId != null

  return useQuery<StudyScheduleDetailType>({
    queryKey: ['study-schedule-detail', groupId, scheduleId],
    queryFn: () =>
      getStudyScheduleDetail(groupId, scheduleId as number | string),
    enabled: canFetch,
  })
}
