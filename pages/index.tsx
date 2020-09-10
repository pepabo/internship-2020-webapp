import { HelloBox } from '~/components/hello-box'
import { BlogBox } from '~/components/blog-box'
import { LoginBox } from '~/components/login-box'
import Link from "next/link"

export const IndexPage = () => (
  <div>
    <h1>BASE APPLICATION</h1>
    <Link href="/abc/blog"><a>test</a></Link>
    <br />
    <Link href="/loginpage"><a>ログイン</a></Link>
    <br />
    <Link href="/blogList"><a>ブログ一覧</a></Link>
    <br />
    <Link href="/blogPost"><a>記事を投稿</a></Link>
  </div >
)
export default IndexPage