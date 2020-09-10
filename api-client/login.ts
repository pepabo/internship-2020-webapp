import ky from 'ky-universal'

type MailPostResponse = { mail: string }
type PasswordPostResponse = { password: string }

export const postUser = async (name: string) => {
    return await ky.post('/api/login', { json: { name } }).json<MailPostResponse>()
    return await ky.post('/api/login', { json: { name } }).json<PasswordPostResponse>()
}