import { HelloBox } from '~/components/hello-box'
import { BlogBox } from '~/components/blog-box'
import { LoginBox } from '~/components/login-box'

export const IndexPage = () => (

  <div>

    <h1>BASE APPLICATION</h1>

    <LoginBox />
    <BlogBox />
  </div>
)
export default IndexPage
