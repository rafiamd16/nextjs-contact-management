import LoginWrapper from '@/components/login-wrapper'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
}

const LoginPage = () => {
  return (
    <>
      <LoginWrapper />
    </>
  )
}

export default LoginPage
