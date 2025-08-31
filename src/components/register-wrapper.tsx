'use client'

import RegisterForm from '@/components/auth/register-form'
import { GithubButton, GoogleButton } from '@/components/buttons'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const RegisterWrapper = () => {
  const pathname = usePathname()

  return (
    <motion.section
      key={pathname}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md rounded-xl border bg-card p-8 text-card-foreground shadow-md dark:bg-neutral-900"
    >
      <div className="space-y-4">
        <h1 className="text-center text-3xl font-bold">Sign Up</h1>
        <RegisterForm />
        <div className="my-4 flex items-center before:flex-1 before:border-t before:border-neutral-500 after:flex-1 after:border-t after:border-neutral-500">
          <p className="mx-4 mb-0 text-center font-semibold text-neutral-400">or</p>
        </div>
        <div className="flex w-full items-center justify-center gap-2">
          <GoogleButton />
          <GithubButton />
        </div>
        <p className="text-center text-sm font-light">
          Already have an account?{' '}
          <Link href="/login">
            <span className="pl-1 font-semibold text-blue-600 hover:text-blue-800">Sign In</span>
          </Link>
        </p>
      </div>
    </motion.section>
  )
}

export default RegisterWrapper
