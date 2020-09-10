import { useEffect, useState } from 'react'
import { ListArticleApiResponse, listArticle } from '~/api-client/article'
import { ArticleListItem } from './article-list-item'

export const ArticleList: React.FC = () => {
  const [result, setResult] = useState([] as ListArticleApiResponse[])
  useEffect(() => {
    void (async () => {
      setResult(await listArticle())
    })()
  }, [])

  return (
    <>
      {result.map((v) => (
        <ArticleListItem key={v.id} id={v.id} title={v.title} createdAt={v.createdAt} />
      ))}
    </>
  )
}

