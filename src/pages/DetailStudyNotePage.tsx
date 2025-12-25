import { Button } from '@/components/common'
import { Preview } from '@/components/markdown'
import {
  BackToStudyGroupButton,
  StudyNoteAttachmentItem,
  StudyNoteBreadcrumb,
} from '@/components/studygroup-note'
import { StudyNoteToggle } from '@/components/studygroup-note/StudyNoteToggle'
import { useUserData } from '@/hooks'
import { useDeleteStudyNote, useStudyNoteDetail } from '@/hooks/study-note'
import { showToast } from '@/lib'
import { formatDateTime } from '@/utils'
import { Bot, Paperclip, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export function DetailStudyNotePage() {
  const [isSummaryOpen, setIsSummaryOpen] = useState(true)
  const { groupId, noteId } = useParams<{ groupId: string; noteId: string }>()
  const navigate = useNavigate()

  const { data } = useStudyNoteDetail(groupId ?? '', noteId ?? '')
  const { data: userData } = useUserData()
  const { mutate: deleteNote } = useDeleteStudyNote(groupId ?? '')

  // 작성자 여부 확인
  const isAuthor = userData && data && userData.id === data.author.id

  const toggleSummary = () => setIsSummaryOpen((prev) => !prev)

  const handleEdit = () => {
    navigate(`/${groupId}/notes/${noteId}/edit`)
  }

  const handleDelete = () => {
    deleteNote(Number(noteId), {
      onSuccess: () => {
        showToast.success('삭제 완료', '스터디 기록이 삭제되었습니다.')
        navigate(`/${groupId}`)
      },
      onError: () => {
        showToast.error('삭제 실패', '스터디 기록 삭제에 실패했습니다.')
      },
    })
  }
  if (!data) return null

  return (
    <div className="flex flex-col gap-6 p-8">
      <StudyNoteBreadcrumb mode="detail" />
      <div className="border-custom-gray-200 rounded-xl border">
        <header className="border-b-custom-gray-200 flex flex-col gap-4 border-b p-6">
          <div className="flex justify-between">
            <h1 className="text-custom-gray-900 text-2xl font-bold">
              {data.title}
            </h1>
            {isAuthor && (
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="h-8"
                  onClick={handleEdit}
                >
                  수정하기
                </Button>
                <Button
                  variant="danger"
                  className="text-danger-800 h-8 bg-red-100 hover:bg-red-200 active:bg-red-300"
                  onClick={handleDelete}
                >
                  삭제하기
                </Button>
              </div>
            )}
          </div>
          <p className="text-custom-gray-600 flex items-center gap-2 text-sm">
            {data.author.profile_img_url ? (
              <img
                src={data.author.profile_img_url}
                alt={`${data.author.nickname} 프로필`}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <span className="bg-primary-100 centralize h-8 w-8 rounded-full">
                <UserRound className="text-primary-600 h-5 w-5" />
              </span>
            )}
            <span>{data.author.nickname}</span>
            <span>&bull;</span>
            <span>작성일: {formatDateTime(data.updated_at)}</span>
          </p>
        </header>

        {/* AI 요약 */}
        <section className="border-b-custom-gray-200 border-b p-6">
          <div className="flex items-center justify-between pb-4">
            <h2 className="flex items-center gap-2">
              <Bot className="text-primary-600 h-5 w-5" />
              <span className="text-custom-gray-900 text-lg font-semibold">
                AI 학습 내용 요약
              </span>
            </h2>
            <StudyNoteToggle isOpen={isSummaryOpen} onToggle={toggleSummary} />
          </div>
          {isSummaryOpen && (
            <div className="text-custom-gray-900 bg-amber-50 p-4">
              <Preview value={data.ai_summary ?? ''} />
            </div>
          )}
        </section>

        {/* 본문 */}
        <section className="border-b-custom-gray-200 border-b p-2">
          <Preview value={data.content ?? ''} />
        </section>

        {/* 첨부 파일 */}
        <section className="p-6">
          <h3 className="text-custom-gray-900 flex items-center gap-2 pb-4">
            <Paperclip className="h-5 w-5" />
            <span className="text-lg font-normal">
              첨부 파일 ({data.files.length}개)
            </span>
          </h3>
          <ul className="grid grid-cols-2 gap-2">
            {data.files.map((file) => (
              <StudyNoteAttachmentItem key={file.id} file={file} />
            ))}
          </ul>
        </section>
      </div>

      <BackToStudyGroupButton />
    </div>
  )
}
