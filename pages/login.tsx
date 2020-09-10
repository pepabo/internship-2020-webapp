import Link from 'next/link'

export const LoginPage: React.FC = () => (
    <>
        <div>ここはログインページじゃ</div>
        <div><Link href="/"><a>トップに戻る</a></Link></div>
    </>
)

export default LoginPage