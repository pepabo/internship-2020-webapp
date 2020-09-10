import styled from 'styled-components'
import { FormEvent, useState } from 'react'
import ky from 'ky'
import { json } from 'body-parser'

export const Form = (props: { title: string, text: string }) => {
    const [blogtitle, setBlogTitle] = useState("")
    const [body, setBody] = useState("")


    const send_blog = async () => {
        const token: string = ""
        const response = await ky.post("/post", {
            json: { blogtitle, body, token }
        })
        const doc = await json()
        console.log(doc)
    }

    const Form = styled.form`
        width:500px;
        margin:10px auto;
    `
    const Br = styled.br`
        margin:20px 0 ;
    `


    const Input = styled.input`
        marign-top:0px;
        margin-left:10px;
        border:none;
        border-bottom:solid 1px gray;
        padding:10px;
        width:200px;
    `

    const Text = styled.textarea`
        width:500px;
        height:400px;
        margin:10px 0;
        font-size:20px;
        border-radius:10px;
    `

    return (
        <div>
            <div>
                <label>{props.title}</label>
                <input type="text" name="title" onChange={(e) => setBlogTitle(e.target.value)} />
                <Br />
                <label>{props.text}</label>
                <Br />
                <textarea onChange={(e) => setBody(e.target.value)}></textarea>
                <Br />
                <button onClick={() => console.log("test")}>投稿</button>
                <p>title:{blogtitle} body: {body}</p>
            </div>
        </div >
    )
}
