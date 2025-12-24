import { Loader2Icon } from 'lucide-react'

export const Loading = () => {
  return (
    <div className="border-custom-gray-200 bg-custom-gray-50 h-[278px] justify-center rounded-2xl border text-center">
      <div className="px-auto centralize h-full flex-col text-center">
        <div className="pb-6">
          <div className="centralize pt-12 pb-6">
            <Loader2Icon size={48} className="text-primary-500 animate-spin" />
          </div>
          <p className="text-custom-gray-900 mb-2 text-[20px] font-bold">
            데이터를 불러오고 있습니다
          </p>
          <p className="text-custom-gray-700 mb-6 text-base">
            잠시만 기다려주세요...
          </p>
        </div>
      </div>
    </div>
  )
}
