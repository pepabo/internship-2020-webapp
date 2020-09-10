import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { logoutUser } from '~/api-client/auth'

export const LogoutPage: React.FC = () => {
  const router = useRouter()
  useEffect(() => {
    void (async () => {
      await logoutUser()
      router.push('/')
    })()
  }, [])
  return <></>
}
export default LogoutPage
