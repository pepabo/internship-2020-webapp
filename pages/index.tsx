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
        <Link href="/artilces/new">
          <a>📝 記事を投稿</a>
        </Link>
      </li>
    </ul>
  </div>
)
export default IndexPage
