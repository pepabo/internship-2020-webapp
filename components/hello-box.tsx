import styled from 'styled-components'
import { FormEvent, useState } from 'react'
import { sayHello } from '~/api-client/hello'

export const HelloBox = () => {
  const [name, setName] = useState('😺')
  const [inputName, setInputName] = useState('')

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    const res = await sayHello(inputName)
    setName(res.hello)
  }

  const HelloDialog = styled.div`
    padding: 0.5rem;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 2rem;
    color: white;
    border-radius: 5px;
    background: blue;
  `

  return (
    <div>
      <HelloDialog>Hello, {name}</HelloDialog>
      <form onSubmit={submitHandler}>
        <input type="text" onChange={(e) => setInputName(e.target.value)} />
        <input type="submit" />
      </form>
    </div>
  )
}
