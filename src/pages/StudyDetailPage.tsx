import { Loading } from '@/components/fallback-ui'
import {
  StudyDetailHero,
  StudyDetailInfo,
  StudyLectureList,
  StudyMemberList,
  StudyNoteList,
  StudyScheduleCalendar,
} from '@/components/studygroup-detail'
import { useUserData } from '@/hooks'
import { useLeaveStudyGroup, useStudyGroupDetail } from '@/hooks/study-group'
import { showToast } from '@/lib'
import { useNavigate, useParams } from 'react-router'

export function StudyDetailPage() {
  const { groupId } = useParams<{ groupId: string }>()
  const numericGroupId = Number(groupId)
  const navigate = useNavigate()

  const { data: userData, isLoading: isUserLoading } = useUserData()
  const currentUserId = userData?.id

  const { data: group, isLoading: isGroupLoading } =
    useStudyGroupDetail(numericGroupId)
  const { mutate: leaveStudyGroup } = useLeaveStudyGroup()

  if (isUserLoading || isGroupLoading) {
    return <Loading />
  }

  if (!group || !currentUserId) return null

  const handleClickEdit = () => {
    navigate(`/${numericGroupId}/edit`)
  }

  const handleClickLeave = () => {
    leaveStudyGroup(numericGroupId, {
      onSuccess: () => {
        showToast.success(
          '스터디 나가기 완료',
          '스터디에서 성공적으로 나갔습니다.'
        )
        navigate('/')
      },
      onError: () => {
        // 에러 메시지 분기 처리 필요
        showToast.warning(
          '스터디 나가기 실패',
          '스터디 그룹을 찾을 수 없습니다.'
        )
      },
    })
  }

  return (
    <div className="flex flex-col gap-8 px-8 pb-20">
      {/* 상단 히어로 */}
      <StudyDetailHero
        group={group}
        currentUserId={currentUserId}
        onClickEdit={handleClickEdit}
        onClickLeave={handleClickLeave}
      />

      {/* 좌측 메인 콘텐츠 */}
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex flex-1 flex-col gap-6">
          <StudyScheduleCalendar
            groupId={numericGroupId}
            members={group.members}
          />
          <StudyNoteList groupId={numericGroupId} />
        </div>

        {/* 우측 사이드 정보 */}
        <div className="flex w-full flex-col gap-6 lg:w-[384px]">
          <StudyDetailInfo group={group} />
          <StudyLectureList lectures={group.lectures} />
          <StudyMemberList
            groupId={numericGroupId}
            members={group.members}
            leaderId={group.members.find((m) => m.is_leader)?.id}
            currentUserId={currentUserId}
          />
        </div>
      </div>
    </div>
  )
}
