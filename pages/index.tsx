import { ArticleList } from '~/components/article-list'
import Link from 'next/link'

export const IndexPage = () => (
  <div>
    <h1>BASE APPLICATION</h1>
    <ul>
      <li>
        <Link href="/signup">
          <a>🌄 サインアップ</a>
        </Link>
      </li>
      <li>
        <Link href="/login">
          <a>🏖 ログイン</a>
        </Link>
      </li>
      <li>
        <Link href="/logout">
          <a>🚗 ログアウト</a>
        </Link>
      </li>
      <li>
        <Link href="/unsubscribe">
          <a>🚪 退会</a>
        </Link>
      </li>
      <li>
        <Link href="/articles">
          <a>🌻 ブログ一覧</a>
        </Link>
      </li>
      <li>
        <Link href="/articles/new">
          <a>📝 記事を投稿</a>
        </Link>
      </li>
    </ul>

    <h2>記事一覧</h2>
    <ArticleList />
  </div>
)
export default IndexPage
