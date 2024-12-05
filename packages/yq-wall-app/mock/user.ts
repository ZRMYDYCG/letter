import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/users',
    method: 'post',
    response: ({ body }) => {
      console.log(body)
      return {
        code: 200,
        data: 'ok',
      }
    },
  },
] as MockMethod[]
