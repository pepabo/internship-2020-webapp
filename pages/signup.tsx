import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signupUser } from '~/api-client/auth'

export const SignupPage: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await signupUser({ email, password })
      router.push('/')
    } catch (e) {
      alert(`サインアップに失敗しました: ${e}`)
    }
  }

  return (
    <article>
      <div>
        <h1>サインアップ</h1>
        <div>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="email">メールアドレス:</label>
              <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="password">パスワード:</label>
              <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div>
              <button type="submit">送信</button>
            </div>
          </form>
        </div>
      </div>
      <Link href="/">
        <a>トップページへ戻る</a>
      </Link>
    </article>
  )
}

export default SignupPage
