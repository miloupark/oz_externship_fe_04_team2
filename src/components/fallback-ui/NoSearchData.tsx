import { Button } from '@/components/common'
import { Clock, Plus, SearchIcon, User } from 'lucide-react'
import { Link } from 'react-router'

interface NoSearchResultProps {
  variant?: 'onGoing' | 'pending' | 'ended' | 'lecture'
  title?: string
  description?: string
}

export const NoSearchResult = ({
  variant = 'onGoing',
  title,
  description,
}: NoSearchResultProps) => {
  const config = {
    onGoing: {
      title: '검색된 진행중인 스터디가 없습니다',
      description: '새로운 스터디 그룹을 만들어보세요!',
      icon: <SearchIcon className="text-custom-gray-400 h-8 w-8" />,
    },
    pending: {
      title: '검색된 대기중 스터디가 없습니다',
      description: '조건을 변경하여 다시 검색해보세요.',
      icon: <User className="text-custom-gray-400 h-8 w-8" />,
    },
    ended: {
      title: '검색된 완료된 스터디가 없습니다',
      description: '아직 완료된 스터디 그룹이 없습니다.',
      icon: <Clock className="text-custom-gray-400 h-8 w-8" />,
    },
    lecture: {
      title: '검색된 강의명이나 강사명이 없습니다',
      description: '다른 키워드로 검색해보세요',
      icon: <SearchIcon className="text-custom-gray-400 h-6 w-6" />,
    },
  }

  const currentConfig = config[variant]

  return (
    <div className="border-custom-gray-200 bg-custom-gray-50 flex h-[382px] justify-center rounded-2xl border text-center">
      <div className="centralize h-full w-full flex-col p-6 text-center">
        <div className="mb-6">
          <div className="bg-custom-gray-100 centralize h-20 w-20 rounded-full">
            {currentConfig.icon}
          </div>
        </div>

        <p className="text-custom-gray-700 mb-2 text-xl font-bold">
          {title || currentConfig.title}
        </p>
        <p className="text-custom-gray-700 mb-6 text-base">
          {description || currentConfig.description}
        </p>
        {variant === 'onGoing' && (
          <Link to="/create">
            <Button variant="primary">
              <Plus size={16} className="mr-2" />새 스터디 만들기
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
