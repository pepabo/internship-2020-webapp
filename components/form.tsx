import styled from 'styled-components'
import { FormEvent, useState } from 'react'

export const Form = (props: { title: string, text: string }) => {

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
            <Form action="" method="POST">
                <label>{props.title}</label>
                <Input type="text" name="title" />
                <Br />
                <label>{props.text}</label>
                <Text></Text>
                <Br />
                <Input type="submit" />
            </Form>
        </div >
    )
}
