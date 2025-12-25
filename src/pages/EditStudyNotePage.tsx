import { getPresignedUrl, uploadToS3 } from '@/api'
import { Button, Input } from '@/components/common'
import { MarkdownEditor } from '@/components/markdown'
import { FileUploader } from '@/components/studygroup-detail'
import { StudyNoteBreadcrumb } from '@/components/studygroup-note'
import { useStudyNoteDetail, useUpdateStudyNote } from '@/hooks/study-note'
import useFileUpload from '@/hooks/study-note/useFileUpload'
import { showToast } from '@/lib'
import type { FileUploadItemType, UpdateStudyNoteRequestType } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export function EditStudyNotePage() {
  const { groupId, noteId } = useParams<{ groupId: string; noteId: string }>()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState<FileUploadItemType[]>([])

  const isInvalidParams = !groupId || !noteId

  const { uploadFiles } = useFileUpload()

  const uploadMutation = useMutation({
    mutationFn: uploadFiles,
  })

  const { data } = useStudyNoteDetail(groupId ?? '', noteId ?? '')
  const { mutateAsync: updateNoteAsync, isPending: isUpdating } =
    useUpdateStudyNote(groupId ?? '', noteId ?? '')

  useEffect(() => {
    if (isInvalidParams) {
      showToast.error('접근 오류', '잘못된 접근입니다.')
      navigate(-1)
    }
  }, [isInvalidParams, navigate])

  // 기존 데이터로 폼 초기화
  useEffect(() => {
    if (data) {
      setTitle(data.title)
      setContent(data.content ?? '')

      const existingFiles: FileUploadItemType[] = data.files.map((file) => ({
        file_name: file.file_name,
        preview_url: file.file_url,
        s3_url: file.file_url,
        type: '',
      }))

      setFiles(existingFiles)
    }
  }, [data])

  if (isInvalidParams) return null

  const handleSubmit = async () => {
    if (uploadMutation.isPending || isUpdating) return

    try {
      // 파일 S3에 업로드 (새 파일만 업로드)
      const uploadedFiles = await uploadMutation.mutateAsync(files)

      // 업로드 실패한 파일 체크
      const failedFiles = uploadedFiles.filter((f) => f.error)
      if (failedFiles.length > 0) {
        const fileNames = failedFiles.map((f) => f.file_name).join(', ')
        showToast.error('업로드 실패', `${fileNames} 업로드에 실패했습니다.`)
        return
      }

      const apiFiles = uploadedFiles
        .filter((f) => f.s3_url != null)
        .map((f) => ({
          file_name: f.file_name,
          file_url: f.s3_url!,
        }))

      const payload: UpdateStudyNoteRequestType = {
        title,
        content,
        files: apiFiles,
        images: [],
      }

      await updateNoteAsync(payload)

      showToast.success('수정 완료', '스터디 기록이 수정되었습니다.')
      navigate(`/${groupId}/notes/${noteId}`)
    } catch {
      showToast.error('수정 실패', '수정에 실패했습니다.')
    }
  }

  const handleImageUpload = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop() ?? ''

    try {
      const { upload_url, file_url, headers } = await getPresignedUrl({
        type: 'NOTE_IMAGE',
        content_type: file.type,
        file_name: file.name,
        file_ext: fileExt,
      })

      await uploadToS3(upload_url, file, headers)

      return file_url
    } catch (error) {
      console.error('이미지 업로드', error)
      showToast.error('업로드 실패', '이미지 업로드에 실패했습니다.')
      throw error
    }
  }

  const handleCancel = () => {
    navigate(-1)
  }

  const isSubmitting = uploadMutation.isPending || isUpdating

  return (
    <div className="flex flex-col p-8">
      <StudyNoteBreadcrumb mode="edit" />
      <header className="pt-4 pb-6">
        <h1 className="text-custom-gray-900 text-3xl font-bold">
          스터디 기록 수정
        </h1>
        <p className="text-custom-gray-600 pt-2">
          학습한 내용을 자세히 기록해보세요.
        </p>
      </header>

      <div className="border-custom-gray-200 flex flex-col gap-6 rounded-xl border p-6">
        <Input
          label="제목"
          placeholder="스터디 기록의 제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div>
          <label className="text-custom-gray-700 text-sm font-medium">
            내용 <span className="text-red-500">*</span>
          </label>
          <MarkdownEditor
            value={content}
            onChange={setContent}
            onImageUpload={handleImageUpload}
          />
          <span className="text-custom-gray-500 text-xs">
            마크다운 문법을 사용할 수 있습니다. 이미지는 드래그 앤 드롭으로
            첨부할 수 있습니다.
          </span>
        </div>

        <div>
          <label className="text-custom-gray-700 text-sm font-medium">
            첨부 파일
          </label>
          <FileUploader value={files} onChange={setFiles} />
        </div>
      </div>

      <div className="flex w-full justify-between gap-4 pt-6">
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          취소
        </Button>
        <Button
          variant="primary"
          className="px-8"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? '저장 중' : '수정 사항 저장'}
        </Button>
      </div>
    </div>
  )
}
