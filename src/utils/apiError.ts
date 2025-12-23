export class ApiError extends Error {
  status: number
  detail?: Record<string, string[]>
  raw?: unknown

  constructor(
    status: number,
    message: string,
    detail?: Record<string, string[]>,
    raw?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.detail = detail
    this.raw = raw
  }

  getFirstMessage() {
    if (!this.detail) return this.message
    const firstField = Object.values(this.detail)[0]
    return firstField?.[0] ?? this.message
  }
}
