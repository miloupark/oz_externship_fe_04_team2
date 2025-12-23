import { Button } from '@/components/common'
import {
  PageHeader,
  StudyGroupInfo,
  StudyGroupLectures,
  StudyGroupMemberSlider,
} from '@/components/studygroup'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useCreateStudyGroup,
  useStudyGroupDetail,
  useUpdateStudyGroup,
} from '@/hooks/study-group'
import { studyGroupSchema, type StudyGroupForm } from '@/schema'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { showToast } from '@/lib'

export function StudyGroupFormPage() {
  const navigate = useNavigate()
  const { groupId } = useParams()
  const isEdit = Boolean(groupId)

  const methods = useForm<StudyGroupForm>({
    resolver: zodResolver(studyGroupSchema),
    defaultValues: {
      name: '',
      introduction: '',
      start_at: '',
      end_at: '',
      max_headcount: 2,
      profile_img_url: '',
      profile_image_file: undefined,
      lectures: [],
    },
  })

  const { reset } = methods

  const { data: detail } = useStudyGroupDetail(groupId!)

  useEffect(() => {
    if (!detail) return

    reset({
      name: detail.name,
      introduction: detail.introduction,
      start_at: detail.start_at,
      end_at: detail.end_at,
      max_headcount: detail.max_headcount,
      profile_img_url: detail.profile_img_url ?? undefined,
      lectures: detail.lectures.map((lecture) => lecture.id),
    })
  }, [detail, reset])

  const { mutate: createStudy, isPending: isCreating } = useCreateStudyGroup()

  const { mutate: updateStudy, isPending: isUpdating } = useUpdateStudyGroup(
    groupId!
  )

  const onSubmit = methods.handleSubmit(
    (formData) => {
      if (isEdit) {
        updateStudy(formData)
      } else {
        createStudy(formData)
      }
    },
    (errors) => {
      const firstError = Object.values(errors)[0]
      if (firstError?.message) {
        showToast.error('입력 오류', firstError.message)
      }
    }
  )

  return (
    <FormProvider {...methods}>
      <form
        className="bg-custom-gray-50 flex w-full flex-col gap-8 p-8"
        onSubmit={onSubmit}
      >
        <PageHeader
          title={isEdit ? '스터디 그룹 수정' : '새 스터디 그룹 만들기'}
          description={
            isEdit
              ? '스터디 그룹 정보를 수정해주세요'
              : '함께 공부할 멤버들과 스터디 그룹을 시작해보세요'
          }
        />
        <StudyGroupInfo />
        <StudyGroupMemberSlider />
        <StudyGroupLectures />
        <div className="flex w-full justify-end gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            취소
          </Button>
          <Button
            variant="primary"
            className="px-8"
            type="submit"
            disabled={isCreating || isUpdating}
          >
            {isEdit ? '수정 완료' : '스터디 그룹 만들기'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
