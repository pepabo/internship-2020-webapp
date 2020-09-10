import ky from 'ky-universal'

export interface LoginUserApiRequest {
  email: string
  password: string
}

export interface LoginUserApiResponse {
  token: string
}

export const loginUser = async (arg: LoginUserApiRequest) => {
  return await ky.post('/api/login', { json: arg }).json<LoginUserApiResponse>()
}

export interface SignupUserApiRequest {
  email: string
  password: string
}

export interface SignupUserApiResponse {
  token: string
}

export const signupUser = async (arg: SignupUserApiRequest) => {
  return await ky.post('/api/signup', { json: arg }).json<SignupUserApiResponse>()
}
