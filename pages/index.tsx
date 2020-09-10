import { ArticleList } from '~/components/article-list'
import { HelloBox } from '~/components/hello-box'
import { BlogBox } from '~/components/blog-box'
import { LoginBox } from '~/components/login-box'
import Link from "next/link"

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
        <Link href="/articles">
          <a>🌻 ブログ一覧</a>
        </Link>
      </li>
      <li>
        <Link href="/artilces/new">
          <a>📝 記事を投稿</a>
        </Link>
      </li>
    </ul>

    <h2>記事一覧</h2>
    <ArticleList />
  </div >
)
export default IndexPage
