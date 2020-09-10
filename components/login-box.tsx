import { useState } from 'react'
import ky from 'ky'

export const LoginBox = (props: { name: string }) => {

    const [mail, setInputMail] = useState('')
    const [password, setInputPass] = useState('')

    const send_login_information = async () => {
        const formData = new FormData()
        formData.append('name', mail)
        formData.append('password', password)

        const response = await ky.post("http://localhost:3000/api/hello", {
            body: formData
        })
        const doc = await response.json()
        setInputPass(doc.hello)
    }


    return (
        <div>
            <h1>ログイン</h1>
            <div>
                メールアドレス:<br />
                <input type="text" onChange={(e) => setInputMail(e.target.value)} /><br />
                パスワード:<br />
                <input type="text" onChange={(e) => setInputPass(e.target.value)} /><br />
                <button onClick={() => send_login_information()}>送信</button>
            </div>
            <br />

            テスト用<br />
            メール:{mail}<br />
            パスワード:{password}<br />
        </div>
    )
}