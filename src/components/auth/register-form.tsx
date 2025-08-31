'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signUpCredentials } from '@/lib/actions/user-action'
import { RegisterFormSchema, registerFormSchema } from '@/lib/validations/user-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaCheckDouble, FaIdCard, FaUserPlus } from 'react-icons/fa6'
import { IoEye, IoEyeOff, IoLockClosed, IoMail } from 'react-icons/io5'
import { toast } from 'sonner'

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { push } = useRouter()

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: RegisterFormSchema) => {
    try {
      const result = await signUpCredentials(data)
      if (result?.error) {
        return toast.error(result.error, {
          richColors: true,
          position: 'top-center',
          duration: 3000,
        })
      }
      push('/login')
      toast.success('Signed up successfully', {
        richColors: true,
        position: 'top-center',
        duration: 3000,
      })
    } catch (error) {
      console.log(error)
      return toast.error('Something went wrong', {
        richColors: true,
        position: 'top-center',
        duration: 3000,
      })
    }
  }

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Full Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    {...field}
                    className="h-11 pl-9"
                    autoComplete="name"
                  />
                  <FaIdCard className="absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="email"
                    placeholder="johndoe@example.com"
                    type="email"
                    {...field}
                    className="h-11 pl-9"
                    autoComplete="email"
                  />
                  <IoMail className="absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Create a password"
                    type={showPassword ? 'text' : 'password'}
                    className="h-11 px-9"
                    {...field}
                    autoComplete="new-password"
                  />
                  <IoLockClosed className="absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <div
                    onClick={handleShowPassword}
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? <IoEyeOff className="size-4" /> : <IoEye className="size-4" />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="h-11 px-9"
                    {...field}
                    autoComplete="new-password"
                  />
                  <FaCheckDouble className="absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <div
                    onClick={handleShowConfirmPassword}
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <IoEyeOff className="size-4" />
                    ) : (
                      <IoEye className="size-4" />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="h-11 w-full cursor-pointer font-bold text-white duration-300 hover:-translate-y-0.5"
          disabled={isSubmitting}
        >
          <FaUserPlus className="size-4" />
          {isSubmitting ? 'Loading...' : 'Register'}
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm
