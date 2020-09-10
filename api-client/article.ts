import ky from 'ky-universal'

export interface CreateArticleApiRequest {
  title: string
  body: string
}

export interface CreateArticleApiResponse {
  id: string
  userId: string
  title: string
  body: string
  createdAt: string
}

export const createArticle = async (arg: CreateArticleApiRequest) => {
  return await ky.post('/api/articles', { json: arg }).json<CreateArticleApiResponse>()
}

export interface GetArticleApiResponse extends CreateArticleApiResponse {}

export const getArticle = async (id: string) => {
  return await ky.get(`/api/articles/${id.toLowerCase()}`).json<GetArticleApiResponse>()
}

export interface ListArticleApiResponse extends CreateArticleApiResponse {}

export const listArticle = async () => {
  return await ky.get('/api/articles').json<ListArticleApiResponse[]>()
}

export interface UpdateArticleApiRequest extends CreateArticleApiRequest {
  id: string
}

export interface UpdateArticleApiResponse extends CreateArticleApiResponse {}

export const updateArticle = async (id: string, arg: UpdateArticleApiRequest) => {
  return await ky.put(`/api/articles/${id.toLowerCase()}`, { json: arg }).json<UpdateArticleApiResponse>()
}

export const deleteArticle = async (id: string) => {
  return await ky.delete(`/api/articles/${id.toLowerCase()}`)
}
