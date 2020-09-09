import { HelloBox } from '~/components/hello-box'
import Link from "next/link"
import { Form } from "~/components/form"

export const IndexPage = () => (
  <div>
    <h1>BASE APPLICATION</h1>
    <HelloBox />
    <div><Link href="/login"><a>ログインページへ</a></Link></div>
    <Form title="ブログタイトル" text="本文" />
  </div>
)
export default IndexPage
