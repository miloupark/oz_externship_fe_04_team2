import { UserModal } from '@/components/layout'
import { EXTERNAL_LINKS } from '@/constants'
import { useIsDesktop, useUserData } from '@/hooks'
import { BellIcon, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import NotificationModal from '@/components/notification/NotificationModal'
import defaultImg from '@/assets/images/defaultProfileImg.svg'

export function User() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isAlarmOpen, setIsAlarmOpen] = useState(false)
  const [isAlarmAnimating, setIsAlarmAnimating] = useState(false)
  const isDesktop = useIsDesktop()

  // 로그인했을때의 모달 상태 관리
  const handleUserModal = () => {
    setIsUserModalOpen((prev) => !prev)
  }

  // 알림 모달 토글 (애니메이션 중에는 연타 방지)
  const handleAlarmModal = () => {
    if (isAlarmAnimating) return
    setIsAlarmAnimating(true)
    setIsAlarmOpen((prev) => !prev)
    if (isUserModalOpen) {
      setIsUserModalOpen(false)
    }
  }

  const { data } = useUserData()

  return (
    <div className="ml-auto flex">
      <div className="text-custom-gray-700 flex items-center gap-8 text-base">
        <div className="hidden md:flex md:gap-8">
          <a
            href={EXTERNAL_LINKS.LECTURES}
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary-600 cursor-pointer"
          >
            강의 목록
          </a>
          {/* 클릭하면 강의목록 페이지 렌더링 */}
          <a href="/" className="hover:text-primary-600 cursor-pointer">
            스터디 그룹
          </a>
          {/* 클릭하면 스터디그룹 페이지로 렌더링 */}
          <a
            href={EXTERNAL_LINKS.RECRUITMENT}
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary-600 cursor-pointer"
          >
            구인 공고
          </a>
          {/* 클릭하면 구인공고 페이지 렌더링 */}
        </div>
        <div className="relative">
          <BellIcon
            className="mt-0.5 h-6 w-6 cursor-pointer"
            onClick={handleAlarmModal}
          />
          {/* 알림 모달,바텀시트 오픈 */}
          {/* 모바일일 때만 배경 오버레이 렌더링 */}
          {!isDesktop && isAlarmOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/30 md:bg-transparent"
              onClick={() => {
                setIsAlarmAnimating(true)
                setIsAlarmOpen(false)
              }}
            />
          )}
          <AnimatePresence
            mode="wait"
            onExitComplete={() => setIsAlarmAnimating(false)}
          >
            {isAlarmOpen && (
              <NotificationModal
                isDesktop={isDesktop}
                onClose={() => {
                  setIsAlarmAnimating(true)
                  setIsAlarmOpen(false)
                }}
                onAnimationComplete={() => setIsAlarmAnimating(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* 클릭하면 유저 모달 나오게 */}
      <div
        className="relative ml-4 flex cursor-pointer items-center gap-2"
        onClick={handleUserModal}
      >
        <div className="h-7 w-7 overflow-hidden rounded-full sm:h-8 sm:w-8">
          <img
            src={data?.profile_img_url || defaultImg}
            alt="profileIcon"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-primary-600 text-base">{data?.name}</div>
        {isUserModalOpen ? (
          <ChevronUp className="hidden md:block md:h-4 md:w-4" />
        ) : (
          <ChevronDown className="hidden md:block md:h-4 md:w-4" />
        )}
        {isUserModalOpen && <UserModal />}
        {/* 추후 목업데이터로 먼저 구현예정 */}
      </div>
    </div>
  )
}
