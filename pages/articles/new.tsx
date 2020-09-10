import Link from 'next/link'
import { ArticleEditor } from '~/components/article-editor'
import { FormEvent } from 'react'
import { createArticle } from '~/api-client/article'
import { useInput } from '~/hooks/use-input'
import { useRouter } from 'next/router'

export const ArticleNewPage: React.FC = () => {
  const router = useRouter()
  const title = useInput('')
  const body = useInput('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const result = await createArticle({
      title: title.value,
      body: body.value,
    })
    router.push('/articles/[id]', `/articles/${result.id}`)
  }

  return (
    <article>
      <ArticleEditor onSubmit={onSubmit} mode="new" title={title} body={body} />
      <Link href="/">
        <a>トップページへ戻る</a>
      </Link>
    </article>
  )
}

export default ArticleNewPage
