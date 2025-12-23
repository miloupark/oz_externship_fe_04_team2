import { Button } from '@/components/common'
import { ScheduleCalendar } from '@/components/schedule-calendar'
import {
  ScheduleCreateModal,
  ScheduleDetailModal,
  ScheduleEditModal,
} from '@/components/studygroup-detail/modal'
import {
  useStudyScheduleDetail,
  useStudySchedules,
} from '@/hooks/study-schedule'
import { useDeleteStudySchedule } from '@/hooks/study-schedule/useDeleteStudySchedule'
import type { StudyGroupMemberType, StudyScheduleDetailType } from '@/types'
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface StudyScheduleCalendarProps {
  groupId: number
  members: StudyGroupMemberType[]
}

export function StudyScheduleCalendar({
  groupId,
  members,
}: StudyScheduleCalendarProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null
  )

  const { data: schedules } = useStudySchedules(groupId)
  const { mutate: deleteSchedule } = useDeleteStudySchedule(groupId)

  const { data: selectedSchedule } = useStudyScheduleDetail(
    groupId,
    selectedScheduleId,
    isDetailOpen
  )

  const handleOpenCreateModal = () => setIsCreateOpen(true)
  const handleCloseCreateModal = () => setIsCreateOpen(false)

  const handleScheduleClick = (scheduleId: number) => {
    setSelectedScheduleId(scheduleId)
    setIsDetailOpen(true)
  }

  const handleCloseDetailModal = () => {
    setIsDetailOpen(false)
    setSelectedScheduleId(null)
  }

  const handleEditSchedule = (_schedule: StudyScheduleDetailType) => {
    setIsDetailOpen(false)
    setIsEditOpen(true)
  }

  const handleDeleteSchedule = (scheduleId: number) => {
    deleteSchedule(scheduleId, {
      onSuccess: () => {
        setIsDetailOpen(false)
        setIsEditOpen(false)
        setSelectedScheduleId(null)
      },
    })
  }

  const handleCloseEditModal = () => {
    setIsEditOpen(false)
    setIsDetailOpen(true)
  }

  const handleSaveEditedSchedule = (_updated: StudyScheduleDetailType) => {
    setIsEditOpen(false)
    setIsDetailOpen(true)
  }

  return (
    <section className="border-custom-gray-200 flex flex-col gap-4 rounded-xl border p-6">
      <div className="flex items-center justify-between pb-6">
        <p className="text-lg font-semibold">스케줄 관리</p>
        <Button
          variant="primary"
          className="gap-2 text-base"
          onClick={handleOpenCreateModal}
        >
          <Plus className="h-4 w-4" />
          <span>스케줄 추가</span>
        </Button>
      </div>

      {/* 스케줄 캘린더 */}
      <ScheduleCalendar
        schedules={schedules ?? []}
        onScheduleClick={handleScheduleClick}
      />

      {/* 새 스케줄 추가 모달 */}
      <ScheduleCreateModal
        isOpen={isCreateOpen}
        onClose={handleCloseCreateModal}
        groupId={groupId}
        members={members}
      />

      {selectedSchedule && (
        <ScheduleDetailModal
          isOpen={isDetailOpen}
          onClose={handleCloseDetailModal}
          schedule={selectedSchedule}
          onEdit={handleEditSchedule}
          onDelete={handleDeleteSchedule}
        />
      )}

      {selectedSchedule && (
        <ScheduleEditModal
          isOpen={isEditOpen}
          onClose={handleCloseEditModal}
          schedule={selectedSchedule}
          onSave={handleSaveEditedSchedule}
          groupId={groupId}
          members={members}
        />
      )}
    </section>
  )
}
