import { useCallback } from 'react'
import { type Accept, type FileRejection, useDropzone } from 'react-dropzone'

interface BaseUploaderProps {
  accept?: Accept
  maxSize?: number
  multiple?: boolean
  onDrop: (files: File[]) => void
  onDropRejected?: (rejections: FileRejection[]) => void
  disabled?: boolean
  children?: React.ReactNode
}

export function BaseUploader({
  accept,
  maxSize = 5 * 1024 * 1024,
  multiple = false,
  onDrop,
  onDropRejected,
  disabled,
  children,
}: BaseUploaderProps) {
  const handleDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      if (rejected.length > 0 && onDropRejected) {
        onDropRejected(rejected)
      }
      onDrop(accepted)
    },
    [onDrop, onDropRejected]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxSize,
    multiple,
    onDrop: handleDrop,
  })

  return (
    <div
      {...getRootProps()}
      className={`centralize relative w-full flex-col rounded-lg border-2 border-dashed p-6 ${
        disabled
          ? 'bg-custom-gray-100 border-custom-gray-200 cursor-not-allowed opacity-60'
          : isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'hover:bg-custom-gray-50 border-custom-gray-300 bg-white'
      } `}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  )
}
