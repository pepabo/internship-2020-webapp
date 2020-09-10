import { useRouter } from 'next/router'
import { unsubscribeUser } from '~/api-client/auth'
import { FormEvent } from 'react'
import styled from 'styled-components'

const DangerButton = styled.button`
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  padding: 10px;
  background-color: #e53935;
  border: solid 1px #c62828;

  &:hover {
    opacity: 0.8;
  }
`

export const UnsubscribePage: React.FC = () => {
  const router = useRouter()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!confirm('本当に退会してよろしいでござるか？')) {
      return
    }
    await unsubscribeUser()
    router.push('/')
  }

  return (
    <>
      <div>
        <h1>退会</h1>
        <div>
          ブログから退会します。退会すると投稿した情報はすべて削除されもとに戻すことはできません。本当に退会される場合は下記の「退会する」クリックしてください。
        </div>
        <div>
          <form onSubmit={onSubmit}>
            <DangerButton type="submit">退会する</DangerButton>
          </form>
        </div>
      </div>
    </>
  )
}
export default UnsubscribePage
