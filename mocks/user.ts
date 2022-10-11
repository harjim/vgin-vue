import { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'

export default [
  {
    url: '/api/user/login',
    method: 'get',
    timeout: Random.integer(300, 1500),
    response: ({ query }) => {
      console.log(query)
      if (query.username === 'admin' && query.password === '123!@#abcABC') {
        return {
          code: 200,
          status: true,
          data: Random.string(12),
          msg: 'ok',
          timestamp: Random.date('T')
        }
      }
      return {
        code: 403,
        status: false,
        data: null,
        msg: '账号密码错误',
        timestamp: Random.date('T')
      }
    }
  }
] as MockMethod[]
