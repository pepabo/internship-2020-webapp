import { useRouter } from 'next/router'
import { getArticle, updateArticle } from '~/api-client/article'
import { useEffect, useState, FormEvent } from 'react'
import { ArticleEditor } from '~/components/article-editor'
import { useInput } from '~/hooks/use-input'

export const PostEditPage: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const articleId = typeof router.query.id === 'string' ? router.query.id : null

  const title = useInput('')
  const body = useInput('')

  useEffect(() => {
    if (!articleId) {
      return
    }
    void (async () => {
      const res = await getArticle(articleId)
      title.set(res.title)
      body.set(res.body)
    })()
  }, [articleId])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!articleId) {
      return
    }
    setLoading(true)
    try {
      await updateArticle(articleId, { id: articleId, title: title.value, body: body.value })
      router.push('/articles/[id]', `/articles/${articleId}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ArticleEditor mode="edit" onSubmit={onSubmit} title={title} body={body} />
    </>
  )
}

export default PostEditPage
