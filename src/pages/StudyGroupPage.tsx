import { Button } from '@/components/common'
import { Loading } from '@/components/fallback-ui'
import { ReviewListModal, ReviewModal } from '@/components/review'
import {
  StudyCard,
  StudyGroupSearchInput,
  StudySection,
} from '@/components/studygroup'
import { useStudyGroups } from '@/hooks/study-group/useStudyGroups'
import { useStudyGroupStore } from '@/store'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

export function StudyGroupPage() {
  const { data: studies = [], isLoading } = useStudyGroups()
  const { selectedStudy, modal } = useStudyGroupStore()

  const [searchTerm, setSearchTerm] = useState('')

  const filteredStudies = studies.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const ongoingStudies = filteredStudies.filter((s) => s.status === 'ONGOING')
  const pendingStudies = filteredStudies.filter((s) => s.status === 'PENDING')
  const endedStudies = filteredStudies.filter((s) => s.status === 'ENDED')

  return (
    <div className="flex flex-col gap-8 p-8">
      <header className="mb-6 flex w-full flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h2>스터디 그룹</h2>
          <div className="flex flex-col sm:flex-row">
            <p className="mr-1">함께 공부하며 성장하는 스터디 그룹에</p>
            <p>참여해보세요</p>
          </div>
        </div>
        <Link to="/create">
          <Button variant="primary" className="mt-4 w-fit md:mt-0">
            <Plus size={16} className="mr-2" />새 스터디 만들기
          </Button>
        </Link>
      </header>
      <StudyGroupSearchInput value={searchTerm} onChange={setSearchTerm} />
      {isLoading ? (
        <Loading />
      ) : (
        <section className="flex flex-col gap-8">
          <StudySection
            name="진행중인 스터디"
            description="현재 활발히 진행되고 있는 스터디 그룹들"
            badgeText={`${ongoingStudies.length}개 진행중`}
            badgeColor="bg-success-100 text-success-700"
            searchTerm={searchTerm}
            items={ongoingStudies}
            variant="onGoing"
          >
            {ongoingStudies.map((study) => (
              <StudyCard key={study.id} study={study} />
            ))}
          </StudySection>
          <StudySection
            name="대기중 스터디"
            description="스터디 기간이 시작되지 않은 스터디 그룹들"
            badgeText={`${pendingStudies.length}개 대기중`}
            badgeColor="bg-custom-gray-100 text-custom-gray-600"
            searchTerm={searchTerm}
            items={pendingStudies}
            variant="pending"
          >
            {pendingStudies.map((study) => (
              <StudyCard key={study.id} study={study} />
            ))}
          </StudySection>
          <StudySection
            name="완료된 스터디"
            description="성공적으로 마무리된 스터디 그룹들"
            badgeText={`${endedStudies.length}개 종료됨`}
            badgeColor="bg-danger-100 text-danger-600"
            searchTerm={searchTerm}
            items={endedStudies}
            variant="ended"
          >
            {endedStudies.map((study) => (
              <StudyCard key={study.id} study={study} />
            ))}
          </StudySection>
        </section>
      )}
      {selectedStudy && modal === 'list' && <ReviewListModal />}
      {selectedStudy && modal === 'edit' && <ReviewModal />}
    </div>
  )
}
