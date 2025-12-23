import { ImagePlus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button, BaseUploader } from '@/components/common'
import { showToast } from '@/lib'
import { useImageUpload } from '@/hooks/study-group'
import type { FileRejection } from 'react-dropzone'

const MAX_BYTES = 5 * 1024 * 1024

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
}

export function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const { uploadImage } = useImageUpload()

  useEffect(() => {
    setPreview(value || null)
  }, [value])

  const onDrop = async (files: File[]) => {
    const file = files[0]
    if (!file || isUploading) return

    setIsUploading(true)

    const result = await uploadImage(file)

    if (result.error) {
      showToast.error('이미지 업로드 실패', result.error)
      setIsUploading(false)
      return
    }

    const blobUrl = URL.createObjectURL(file)
    setPreview(blobUrl)
    onChange(result.imageUrl!)

    setIsUploading(false)
  }

  const onDropRejected = (rejections: FileRejection[]) => {
    const tooLarge = rejections.some((r) =>
      r.errors.some((e) => e.code === 'file-too-large')
    )
    if (tooLarge) {
      showToast.warning('파일 크기 초과', '이미지는 5MB 이하만 가능합니다')
    }
  }

  const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    onChange('')
  }

  return (
    <BaseUploader
      accept={{
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/png': ['.png'],
        'image/webp': ['.webp'],
      }}
      maxSize={MAX_BYTES}
      multiple={false}
      onDrop={onDrop}
      onDropRejected={onDropRejected}
      disabled={isUploading}
    >
      {preview ? (
        <div className="relative w-full overflow-hidden rounded-lg">
          <img
            src={preview}
            alt="Preview"
            className="bg-custom-gray-50 h-32 w-full object-contain"
          />
          <Button
            variant="ghost"
            className="text-custom-gray-400 absolute top-2 right-2"
            onClick={removeImage}
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <div className="centralize flex-col gap-1 text-center">
          <ImagePlus size={36} className="text-custom-gray-400" />
          <p className="text-custom-gray-600 text-sm">
            {isUploading ? '업로드 중...' : '클릭하여 이미지 업로드'}
          </p>
          <p className="text-custom-gray-400 text-xs">
            JPG, PNG, WEBP (최대 5MB)
          </p>
        </div>
      )}
    </BaseUploader>
  )
}
