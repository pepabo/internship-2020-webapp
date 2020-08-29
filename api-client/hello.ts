import ky from 'ky-universal'

type HelloPostResponse = { hello: string }

export const sayHello = async (name: string) => {
  return await ky.post('/api/hello', { json: { name } }).json<HelloPostResponse>()
}
