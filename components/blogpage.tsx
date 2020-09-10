import styled from 'styled-components'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Link from "next/link"

export const BlogPage = () => {
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("2020-9-11")
    const [text, setText] = useState("")

    const router = useRouter()
    const { pid } = router.query

    return (
        <div>
            <div>
                <h2>ブログタイトル</h2>
                <hr />
                <p>:{pid}</p>
                <p>本文</p>
                <Link href={'/' + date + "/blog"}><a>test</a></Link>
            </div>
        </div>
    )
}