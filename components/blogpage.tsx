import styled from 'styled-components'
import { FormEvent, useState } from 'react'

export const BlogPage = () => {
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("2020-9-11")
    const [text, setText] = useState("")



    return (
        <div>
            <div>
                <h2>ブログタイトル</h2>
                <hr />
                <p>日時</p>
                <p>本文</p>
            </div>
        </div>
    )
}