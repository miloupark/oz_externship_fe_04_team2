import { Button } from '@/components/common'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

export function NotFound() {
  return (
    <div className="border-custom-gray-200 bg-custom-gray-50 flex h-[540px] items-center rounded-2xl border">
      <div className="w-full p-6 text-center">
        <h4 className="text-primary-500 text-[96px]">404</h4>
        <p className="text-custom-gray-700 mb-6 text-[20px] font-bold">
          찾으시는 페이지가 없습니다
        </p>
        <div className="centralize h-28 flex-col gap-4 text-center">
          <p className="text-custom-gray-700 px-8 text-sm md:px-16 md:text-base lg:px-32">
            방문하시려는 페이지의 주소가 잘못 입력되었거나, 삭제되어 사용하실 수
            없습니다.{' '}
            <span className="sm:block">
              입력하신 주소가 정확한지 다시 한번 확인해 주세요.
            </span>
          </p>
          <Link to="/">
            <Button size="lg" variant="primary">
              홈으로 가기
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
