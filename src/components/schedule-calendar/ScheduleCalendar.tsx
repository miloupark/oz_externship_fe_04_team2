import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calendar.css'
import { localizer } from '@/utils'
import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import {
  CustomToolbar,
  ScheduleEventItem,
} from '@/components/schedule-calendar'
import type { StudyScheduleListItemType } from '@/types'
import { parseISO } from 'date-fns'

export interface ScheduleEvent {
  id: number
  title: string
  timeLabel: string
  start: Date
  end: Date
}

interface ScheduleCalendarProps {
  schedules: StudyScheduleListItemType[]
  onScheduleClick?: (scheduleId: number) => void
}

export function ScheduleCalendar({
  schedules,
  onScheduleClick,
}: ScheduleCalendarProps) {
  const [month, setMonth] = useState(new Date())
  const formats = {
    monthHeaderFormat: 'yyyy년 MM월',
    dayHeaderFormat: 'MM월 dd일 eeee',
    popupHeaderFormat: 'MM월 dd일 eeee',
  }

  // react-big-calendar는 start/end가 Date 객체인 이벤트 배열 요구
  const toEvent = (schedule: StudyScheduleListItemType): ScheduleEvent => {
    const dateStr = schedule.session_date.substring(0, 10)
    const startTime = schedule.start_time.substring(0, 5)
    const endTime = schedule.end_time.substring(0, 5)

    return {
      id: schedule.id,
      title: schedule.title,
      timeLabel: `${startTime} ~ ${endTime}`,
      start: parseISO(`${dateStr}T${schedule.start_time}`),
      end: parseISO(`${dateStr}T${schedule.end_time}`),
    }
  }

  // API 스케줄 목록을 캘린더 이벤트 배열로 변환
  const events = (schedules ?? []).map(toEvent)

  // 월 변경 핸들러
  const handleMonthNavigate = (newDate: Date) => {
    setMonth(newDate)
  }

  const handleSelectScheduleDetail = (event: ScheduleEvent) => {
    onScheduleClick?.(event.id)
  }

  return (
    <div className="h-[50vh] max-h-[600px] min-h-[320px]">
      <Calendar
        localizer={localizer}
        date={month}
        onNavigate={handleMonthNavigate}
        formats={formats}
        startAccessor="start"
        endAccessor="end"
        events={events}
        defaultView="month"
        views={['month']}
        selectable
        culture="ko"
        components={{
          toolbar: CustomToolbar,
          event: ScheduleEventItem,
        }}
        popup
        messages={{
          showMore: (total) => (
            <span className="rbc-show-more-text" data-count={`+${total}`}>
              +{total} more
            </span>
          ),
        }}
        onSelectEvent={handleSelectScheduleDetail}
      />
    </div>
  )
}
