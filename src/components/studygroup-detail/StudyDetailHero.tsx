import { Button } from '@/components/common'
import { StudyStatusBadge } from '@/components/studygroup-detail/StudyStatusBadge'
import type { StudyGroupDetailType } from '@/types'
import { formatDotDate } from '@/utils'
import { Calendar, LogOutIcon, Pencil, UsersRound } from 'lucide-react'

interface StudyDetailHeroProps {
  group: StudyGroupDetailType
  onClickEdit: () => void
  onClickLeave: () => void
}

export function StudyDetailHero({
  group,
  onClickEdit,
  onClickLeave,
}: StudyDetailHeroProps) {
  return (
    <section className="border-custom-gray-200 overflow-hidden rounded-xl border">
      <div className="relative aspect-[16/9] w-full md:h-[480px] lg:h-[608px]">
        {/* 배경 이미지 */}
        <img
          src={
            group.profile_img_url ??
            'https://blog.kakaocdn.net/dna/bEACaU/btqU4Ynqyia/AAAAAAAAAAAAAAAAAAAAAFm6i4gzRgD9jKhrzYnFl7XIeG9IHtcy2tsNjqvDaI3v/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1767193199&allow_ip=&allow_referer=&signature=Hw2YRFFdo6VSKLw5ReC4IIJEkm0%3D'
          }
          alt={group.name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* 이미지 오버레이 */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex flex-col justify-between p-6">
          {/* 상단 버튼 */}
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              className="gap-2 text-base"
              onClick={onClickEdit}
            >
              <Pencil className="h-4 w-4" />
              <span>수정하기</span>
            </Button>
            <Button
              variant="danger"
              className="gap-2 text-base"
              onClick={onClickLeave}
            >
              <LogOutIcon className="h-4 w-4" />
              <span>나가기</span>
            </Button>
          </div>

          {/* 스터디 정보 */}
          <div className="flex flex-col gap-2">
            <h1 className="text-custom-gray-50 text-xl sm:text-2xl md:text-3xl">
              {group.name}
            </h1>
            <ul className="text-custom-gray-100 flex gap-4">
              <li className="flex items-center gap-1">
                <UsersRound className="h-4 w-4" /> {group.current_headcount}/
                {group.max_headcount}명
              </li>
              <li className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDotDate(group.start_at)} ~ {formatDotDate(group.end_at)}
              </li>
              <li>
                <StudyStatusBadge status={group.status} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
