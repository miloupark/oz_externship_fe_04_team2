import { createStudyGroup } from '@/api'
import { showToast } from '@/lib'
import { ApiError } from '@/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

export function useCreateStudyGroup() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: createStudyGroup,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['studyGroups'],
      })

      showToast.success('생성 성공!', '스터디 그룹이 생성되었습니다')
      navigate(`/${data.id}`)
    },

    onError: (error) => {
      if (error instanceof ApiError) {
        showToast.error('실패!', error.getFirstMessage())
      } else {
        showToast.error('스터디 생성 실패!', '스터디 생성에 실패했습니다')
      }
    },
  })
}
