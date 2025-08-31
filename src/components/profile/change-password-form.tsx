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
import { changePassword } from '@/lib/actions/user-action'
import { changePasswordSchema, ChangePasswordSchema } from '@/lib/validations/user-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { RefreshCcw } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaCheckDouble, FaKey } from 'react-icons/fa6'
import { IoEye, IoEyeOff, IoLockClosed } from 'react-icons/io5'
import { toast } from 'sonner'

const ChangePasswordForm = () => {
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form

  const handleShowOldPassword = () => {
    setShowOldPassword((prev) => !prev)
  }

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  const onSubmit = async (data: ChangePasswordSchema) => {
    try {
      const result = await changePassword(data)
      if (result?.error) {
        return toast.error(result.error, {
          richColors: true,
          position: 'top-center',
          duration: 5000,
        })
      }
      reset()
      toast.success('Password changed successfully', {
        richColors: true,
        position: 'top-center',
        duration: 3000,
      })
    } catch (_) {
      return toast.error('Something went wrong', {
        richColors: true,
        position: 'top-center',
        duration: 3000,
      })
    }
  }

  return (
    <div className="card-hover overflow-hidden rounded-xl border bg-card shadow-md dark:bg-neutral-900">
      <div className="p-6">
        <div className="mb-4 flex items-center">
          <div className="mr-3 flex items-center justify-center rounded-full bg-purple-500 p-2.5 shadow-md">
            <FaKey size={24} className="text-white" />
          </div>
          <h2 className="text-xl font-semibold">Change Password</h2>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="oldPassword"
                        placeholder="Enter your old password"
                        type={showOldPassword ? 'text' : 'password'}
                        className="h-12 px-9"
                        {...field}
                        autoComplete="current-password"
                      />
                      <IoLockClosed className="absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                      <div
                        onClick={handleShowOldPassword}
                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                        tabIndex={-1}
                      >
                        {showOldPassword ? (
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

            <FormField
              control={control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="newPassword">New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        placeholder="Enter your new password"
                        type={showPassword ? 'text' : 'password'}
                        className="h-12 px-9"
                        {...field}
                        autoComplete="new-password"
                      />
                      <IoLockClosed className="absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                      <div
                        onClick={handleShowPassword}
                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                        tabIndex={-1}
                      >
                        {showPassword ? (
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
                        placeholder="Confirm your new password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="h-12 px-9"
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
            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="h-12 w-full cursor-pointer bg-primary text-base text-white hover:bg-primary/90"
              >
                <FaKey />
                {isSubmitting ? 'Updating...' : 'Update Password'}
              </Button>
              <Button
                onClick={() => reset()}
                size="sm"
                variant="outline"
                className="w-max self-end"
              >
                <RefreshCcw />
                Refresh
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ChangePasswordForm
