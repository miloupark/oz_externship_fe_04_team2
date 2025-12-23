import { EXTERNAL_LINKS } from '@/constants'
import { showToast } from '@/lib'
import { useNavigate } from 'react-router'

export function Guest() {
  const navigate = useNavigate()

  return (
    <div className="ml-auto flex items-center">
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
          <p
            onClick={() => {
              showToast.error('실패', '로그인 후 이용할 수 있는 서비스입니다')
              navigate(EXTERNAL_LINKS.LOGIN)
            }}
            className="hover:text-primary-600 cursor-pointer"
          >
            스터디 그룹
          </p>
          {/* 스터디 그룹은 로그인 안되어있으면 로그인 페이지 알림 ui */}
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
        <a
          href={EXTERNAL_LINKS.LOGIN}
          className="hover:text-primary-600 text-base md:cursor-pointer md:text-lg"
        >
          로그인
        </a>
        {/* 클릭하면 로그인 페이지 렌더링 */}
      </div>
      <a href={EXTERNAL_LINKS.SIGNUP}>
        <button className="bg-primary-500 text-basic-white ml-4 h-10 w-[90.89px] rounded-lg text-base md:text-lg">
          회원가입
        </button>
      </a>
      {/* 클릭하면 회원가입 페이지 렌더링 */}
    </div>
  )
}
