import { Badge, Button, Modal } from '@/components/common'
import { useBodyScrollLock } from '@/hooks'
import type { StudyScheduleDetailType } from '@/types'
import { formatDateTime, formatYearMonthDay } from '@/utils'
import { Calendar, Clock3, UserRound } from 'lucide-react'

interface ScheduleDetailModalProps {
  isOpen: boolean
  onClose: () => void
  schedule: StudyScheduleDetailType
  onEdit: (schedule: StudyScheduleDetailType) => void
  onDelete: (scheduleId: number) => void
}

export function ScheduleDetailModal({
  isOpen,
  onClose,
  schedule,
  onEdit,
  onDelete,
}: ScheduleDetailModalProps) {
  const dateOnly = schedule.session_date.substring(0, 10)

  useBodyScrollLock(isOpen)

  const handleClickEdit = () => {
    onEdit(schedule)
  }

  const handleClickDelete = () => {
    onDelete(schedule.id)
  }

  const participants = schedule.participants
  const participantCount = participants.length

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="스케줄 상세"
      wrapperClassName="w-screen rounded-none sm:rounded-xl lg:max-w-[673px] sm:max-w-[520px] md:max-w-[600px] h-dvh sm:h-auto max-h-none p-0 m-0 md:max-h-[80vh] sm:w-full sm:mx-6 sm:my-10"
      innerClassName="mb-0 p-6 justify-start items-start"
      titleClassName="p-6 border-b border-custom-gray-200"
    >
      <p className="text-custom-gray-900 text-lg">{schedule.title}</p>

      <div className="flex w-full flex-col gap-2">
        <p className="text-custom-gray-700 text-sm font-medium">스터디 목표</p>
        <p className="text-custom-gray-700 bg-custom-gray-50 rounded-lg p-4">
          {schedule.objective}
        </p>
      </div>

      <div className="flex w-full gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-custom-gray-700 text-sm font-medium">
            스터디 날짜
          </p>
          <p className="text-custom-gray-700 inline-flex items-center gap-2 text-sm font-medium">
            <Calendar className="text-custom-gray-400 h-4 w-4" />
            {formatYearMonthDay(dateOnly)}
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <p className="text-custom-gray-700 text-sm font-medium">
            스터디 시간
          </p>
          <p className="text-custom-gray-700 inline-flex items-center gap-2 text-sm font-medium">
            <Clock3 className="text-custom-gray-400 h-4 w-4" />
            {schedule.start_time.substring(0, 5)} ~{' '}
            {schedule.end_time.substring(0, 5)}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <p className="text-custom-gray-700 text-sm font-medium">
          참여자 목록 ({participantCount}명)
        </p>
        <ul className="border-custom-gray-200 flex max-h-[192px] min-h-24 flex-col gap-2 overflow-y-auto rounded-lg border p-4">
          {participants.map((member) => (
            <li key={member.id} className="flex items-center gap-3">
              {member.profile_img_url ? (
                <img
                  src={member.profile_img_url}
                  alt={`${member.nickname} 프로필`}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <span className="bg-primary-100 centralize h-8 w-8 rounded-full">
                  <UserRound className="text-primary-600 h-[14px] w-[14px]" />
                </span>
              )}
              <span className="text-sm">{member.nickname}</span>
              {member.is_leader && (
                <Badge variant="primary" className="h-6 rounded-sm px-2">
                  리더
                </Badge>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-custom-gray-200 flex w-full items-center justify-between gap-3 border-t pt-6">
        <span className="text-custom-gray-500 text-xs">
          생성일: {formatDateTime(schedule.created_at)}
        </span>
        <div className="flex gap-3">
          <Button variant="primary" type="button" onClick={handleClickEdit}>
            수정
          </Button>
          <Button variant="danger" type="button" onClick={handleClickDelete}>
            삭제
          </Button>
        </div>
      </div>
    </Modal>
  )
}
