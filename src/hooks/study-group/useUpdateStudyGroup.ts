import { updateStudyGroup } from '@/api/studygroup'
import { showToast } from '@/lib'
import type { StudyGroupDetailType, UpdateStudyGroupRequestType } from '@/types'
import { ApiError } from '@/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useNavigate } from 'react-router'

// 스터디 그룹 수정
export const useUpdateStudyGroup = (groupId: string | number) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<
    StudyGroupDetailType,
    AxiosError,
    UpdateStudyGroupRequestType
  >({
    mutationFn: (body) => updateStudyGroup(groupId, body),
    onSuccess: () => {
      // 상세 데이터 갱신
      queryClient.invalidateQueries({
        queryKey: ['study-group-detail', groupId],
      })
      // 목록 갱신
      queryClient.invalidateQueries({
        queryKey: ['study-groups'],
      })

      showToast.success('수정 성공!', '스터디 그룹이 수정되었습니다')
      navigate(`/${groupId}`)
    },

    onError: (error) => {
      if (error instanceof ApiError) {
        showToast.error('실패!', error.getFirstMessage())
      } else {
        showToast.error('스터디 수정 실패!', '스터디 수정에 실패했습니다')
      }
    },
  })
}
