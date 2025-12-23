import { useState } from 'react'
import { Button, RangeSlider } from '@/components/common'
import { Calendar, Users } from 'lucide-react'
import { DatePickerModal } from '@/components/date-picker'
import type { StudyGroupForm } from '@/schema'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

export function StudyGroupMemberSlider() {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<StudyGroupForm>()

  const startDate = useWatch({ control, name: 'start_at' })
  const endDate = useWatch({ control, name: 'end_at' })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeField, setActiveField] = useState<'start' | 'end' | null>(null)

  return (
    <>
      <section className="border-custom-gray-200 flex w-full flex-col gap-6 rounded-xl border bg-white p-8">
        <h1 className="text-xl font-bold">스터디 기간 및 인원</h1>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Controller
            control={control}
            name="start_at"
            rules={{ required: '시작일을 선택해주세요' }}
            render={({ field }) => {
              const date = field.value ? new Date(field.value) : undefined
              return (
                <div className="flex flex-1 flex-col gap-1">
                  <label className="text-custom-gray-700 text-sm font-medium">
                    스터디 시작일 *
                  </label>
                  <Button
                    variant="outline"
                    className="text-custom-gray-400 flex h-12 w-full justify-between"
                    onClick={() => {
                      setActiveField('start')
                      setIsModalOpen(true)
                    }}
                    type="button"
                  >
                    <p>
                      {date ? date.toLocaleDateString() : '날짜를 선택하세요'}
                    </p>
                    <Calendar size={16} />
                  </Button>
                  {errors.start_at && (
                    <p className="text-danger-500 text-sm">
                      {errors.start_at.message as string}
                    </p>
                  )}
                </div>
              )
            }}
          />
          <Controller
            control={control}
            name="end_at"
            rules={{ required: '종료일을 선택해주세요' }}
            render={({ field }) => {
              const date = field.value ? new Date(field.value) : undefined
              return (
                <div className="flex flex-1 flex-col gap-1">
                  <label className="text-custom-gray-700 text-sm font-medium">
                    스터디 종료일 *
                  </label>
                  <Button
                    variant="outline"
                    className="text-custom-gray-400 flex h-12 w-full justify-between"
                    onClick={() => {
                      setActiveField('end')
                      setIsModalOpen(true)
                    }}
                    type="button"
                  >
                    <p>
                      {date ? date.toLocaleDateString() : '날짜를 선택하세요'}
                    </p>
                    <Calendar size={16} />
                  </Button>

                  {errors.end_at && (
                    <p className="text-danger-500 text-sm">
                      {errors.end_at.message as string}
                    </p>
                  )}
                </div>
              )
            }}
          />
        </div>
        <Controller
          control={control}
          name="max_headcount"
          rules={{ required: true, min: 2, max: 10 }}
          render={({ field }) => (
            <div>
              <label className="text-custom-gray-700 text-sm font-medium">
                최대 인원 수 *
              </label>
              <div className="flex items-center gap-8">
                <div className="flex-1">
                  <RangeSlider
                    min={2}
                    max={10}
                    step={1}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <div className="text-custom-gray-500 mt-2 flex justify-between text-xs font-medium">
                    <span>2명</span>
                    <span>10명</span>
                  </div>
                </div>
                <div className="flex min-w-15 items-center gap-2 pb-6">
                  <Users className="text-custom-gray-400 h-5 w-5" />
                  <span className="text-custom-gray-900 text-xl font-bold">
                    {field.value}
                  </span>
                  <span className="text-custom-gray-500 text-sm font-medium">
                    명
                  </span>
                </div>
              </div>
            </div>
          )}
        />
      </section>
      <DatePickerModal
        isOpen={isModalOpen}
        disabled={
          activeField === 'end' && startDate
            ? { before: new Date(startDate) }
            : { before: new Date() }
        }
        selected={
          activeField === 'start'
            ? startDate
              ? new Date(startDate)
              : undefined
            : activeField === 'end'
              ? endDate
                ? new Date(endDate)
                : undefined
              : undefined
        }
        onClose={() => {
          setIsModalOpen(false)
          setActiveField(null)
        }}
        onChange={(date) => {
          if (!activeField) return
          if (activeField === 'start') {
            setValue('start_at', date?.toISOString() ?? '')
            setValue('end_at', '')
          } else {
            setValue('end_at', date?.toISOString() ?? '')
          }
        }}
        onConfirm={() => {
          setIsModalOpen(false)
          setActiveField(null)
        }}
      />
    </>
  )
}
