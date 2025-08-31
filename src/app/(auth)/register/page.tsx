import RegisterWrapper from '@/components/register-wrapper'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up',
}

const RegisterPage = () => {
  return (
    <>
      <RegisterWrapper />
    </>
  )
}

export default RegisterPage
