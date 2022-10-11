type BasicRequest<T = unknown> = {
  code: number
  status: boolean
  data: T
  msg: string
  timestamp: string
}

export type LoginResponse = BasicRequest<string>

export default BasicRequest
