import { ArticleDetail } from '~/components/article-detail'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getArticle } from '~/api-client/article'

export const ArticleDetailPage = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [createdAt, setCreatedAt] = useState('')

  const articleId = typeof router.query.id === 'string' ? router.query.id : null

  useEffect(() => {
    if (!articleId) {
      return
    }
    void (async () => {
      const res = await getArticle(articleId)
      setTitle(res.title)
      setBody(res.body)
      setCreatedAt(res.createdAt)
    })()
  }, [articleId])

  return (
    <div>
      <ArticleDetail title={title} body={body} createdAt={createdAt} />
      <ul>
        <li>
          <Link href="/articles/[id]/edit" as={`/articles/${articleId}/edit`}>
            <a>この記事を編集する</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>トップページへ戻る</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
export default ArticleDetailPage
