import { Badge, Button, Card } from '@/components/common'
import {
  useDelegateStudyGroupLeader,
  useKickStudyGroupMember,
} from '@/hooks/study-group'
import { showToast } from '@/lib'
import type { StudyGroupMemberType } from '@/types'
import { Plus, UserRound, X } from 'lucide-react'

interface StudyMemberListProps {
  groupId: number
  members: StudyGroupMemberType[]
}

export function StudyMemberList({ groupId, members }: StudyMemberListProps) {
  const { mutate: delegateLeader } = useDelegateStudyGroupLeader(groupId)
  const { mutate: kickMember } = useKickStudyGroupMember(groupId)

  const handleDelegateLeader = (targetMemberId: number) => {
    delegateLeader(targetMemberId, {
      onSuccess: () =>
        showToast.success('리더 위임 완료', '리더 권한이 위임되었습니다.'),
      onError: () =>
        showToast.warning('리더 위임 실패', '잠시 후 다시 시도해주세요.'),
    })
  }

  const handleKickMember = (memberId: number) => {
    kickMember(memberId, {
      onSuccess: () => showToast.success('추방 완료', '멤버를 추방했습니다.'),
      onError: () =>
        showToast.warning(
          '추방 실패',
          '권한이 없거나 대상을 찾을 수 없습니다.'
        ),
    })
  }

  return (
    <Card>
      <div className="flex items-center justify-between pb-4">
        <p className="text-lg font-semibold">멤버 목록</p>
        <span className="text-custom-gray-500 text-sm">{members.length}명</span>
      </div>

      <ul className="flex max-h-[384px] flex-col gap-3 overflow-y-auto">
        {members.map((member) => {
          const isLeader = member.is_leader
          const showActions = !isLeader

          return (
            <li key={member.id} className="group flex justify-between">
              <div className="flex items-center gap-3">
                <span className="bg-primary-100 centralize h-10 w-10 rounded-full">
                  <UserRound className="text-primary-600 h-5 w-5" />
                </span>
                <span>{member.nickname}</span>
                {isLeader && (
                  <Badge variant="primary" className="h-6 rounded-sm px-2">
                    리더
                  </Badge>
                )}
              </div>

              {/* 리더 액션 버튼 */}
              {showActions && (
                <div className="hidden items-center gap-3 text-sm group-hover:flex">
                  <Button
                    variant="ghost"
                    title="리더 위임"
                    onClick={() => handleDelegateLeader(member.id)}
                    className="bg-primary-100 hover:bg-primary-200 active:bg-primary-300 h-7 w-7 rounded-full p-0"
                  >
                    <Plus className="text-primary-600 h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    title={`${member.nickname}을 추방`}
                    onClick={() => handleKickMember(member.id)}
                    className="h-7 w-7 rounded-full bg-red-50 p-0 hover:bg-red-100 active:bg-red-200"
                  >
                    <X className="text-danger-600 h-5 w-5" />
                  </Button>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
