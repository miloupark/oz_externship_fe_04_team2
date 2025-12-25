import { Button, Card } from '@/components/common'
import { LecturePagination } from '@/components/studygroup/lecture'
import { useStudyNotes } from '@/hooks/study-note'
import { formatDateTime } from '@/utils'
import { Pencil, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

interface StudyNoteListProps {
  groupId: number
}

export function StudyNoteList({ groupId }: StudyNoteListProps) {
  const navigate = useNavigate()

  const [page, setPage] = useState<number>(1)
  const PAGE_SIZE = 5

  useEffect(() => {
    setPage(1)
  }, [groupId])

  const { data } = useStudyNotes(groupId, page, PAGE_SIZE)

  const notes = data?.results ?? []
  const totalCount = data?.count ?? 0
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  const handleCreate = () => {
    navigate(`/${groupId}/notes/create`)
  }

  const handleNoteDetail = (noteId: number) => {
    navigate(`/${groupId}/notes/${noteId}`)
  }

  return (
    <section className="border-custom-gray-200 flex flex-col rounded-xl border p-6">
      <div className="flex items-center justify-between pb-6">
        <p className="text-lg font-semibold">스터디 기록</p>
        <Button
          variant="primary"
          className="gap-2 text-base"
          onClick={handleCreate}
        >
          <Pencil className="h-4 w-4" />
          <span>작성하기</span>
        </Button>
      </div>

      {notes.length > 0 ? (
        <>
          <ul className="flex flex-col gap-4">
            {notes.map((note) => (
              <li key={note.id}>
                <button
                  type="button"
                  onClick={() => handleNoteDetail(note.id)}
                  className="w-full"
                >
                  <Card className="p-4">
                    <div className="flex justify-between pb-3">
                      <p className="text-custom-gray-900 text-lg">
                        {note.title}
                      </p>
                      <span className="text-custom-gray-500 text-sm">
                        {formatDateTime(note.created_at)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 py-[2px]">
                      {note.author.profile_img_url ? (
                        <img
                          src={note.author.profile_img_url}
                          alt={`${note.author.nickname} 프로필`}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <span className="bg-primary-100 centralize h-8 w-8 rounded-full">
                          <UserRound className="text-primary-600 h-5 w-5" />
                        </span>
                      )}
                      <span className="text-custom-gray-700 text-sm font-medium">
                        {note.author.nickname}
                      </span>
                    </div>
                  </Card>
                </button>
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <LecturePagination
              totalItems={totalCount}
              itemsPerPage={PAGE_SIZE}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </>
      ) : (
        <div className="centralize min-h-[194px] flex-col gap-2">
          <p className="text-custom-gray-900 text-lg font-medium">
            아직 작성된 스터디 기록이 없습니다.
          </p>
          <p className="text-custom-gray-600">첫 스터디 기록을 작성해보세요!</p>
        </div>
      )}
    </section>
  )
}
