import { useState } from 'react'

export const LoginBox = () => {

    const [mail, setInputMail] = useState('')
    const [password, setInputPass] = useState('')

    return (
        <div>
            <h1>ログイン</h1>
            <form>
                メールアドレス:<br />
                <input type="text" onChange={(e) => setInputMail(e.target.value)} /><br />
                パスワード:<br />
                <input type="text" onChange={(e) => setInputPass(e.target.value)} /><br />
                <input type="submit" />
            </form>
            <br />

            テスト用<br />
            メール:{mail}<br />
            パスワード:{password}<br />
        </div>
    )
}