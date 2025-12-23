import { createStudySchedule } from '@/api'
import type {
  CreateStudyScheduleRequestType,
  ScheduleSuccessResponseType,
} from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

// 스터디 스케줄 생성
export const useCreateStudySchedule = (groupId: number | string) => {
  const queryClient = useQueryClient()

  return useMutation<
    ScheduleSuccessResponseType,
    AxiosError,
    CreateStudyScheduleRequestType
  >({
    mutationFn: (body) => createStudySchedule(groupId, body),
    onSuccess: () => {
      // 생성 성공 시 해당 그룹 스케줄 목록 리패치
      queryClient.invalidateQueries({
        queryKey: ['study-schedules', groupId],
        refetchType: 'active',
      })
    },
  })
}
