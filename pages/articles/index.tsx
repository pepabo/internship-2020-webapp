import { ArticleList } from '~/components/article-list'
import Link from 'next/link'

export const ArticleListPage: React.FC = () => (
  <article>
    <h1>記事一覧</h1>
    <ArticleList />
    <Link href="/">
      <a>トップページへ戻る</a>
    </Link>
  </article>
)

export default ArticleListPage
