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
import { updateUser } from '@/lib/actions/user-action'
import { userUpdateSchema, UserUpdateSchema } from '@/lib/validations/user-validation'
import { IUser } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FaSave, FaUserEdit } from 'react-icons/fa'
import { FaEnvelope, FaUser } from 'react-icons/fa6'
import { toast } from 'sonner'

const ProfileForm = ({ user }: { user: IUser }) => {
  const form = useForm<UserUpdateSchema>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: user.name,
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: UserUpdateSchema) => {
    try {
      const result = await updateUser(data)
      if (result?.error) {
        return toast.error(result.error, {
          richColors: true,
          position: 'top-center',
          duration: 3000,
        })
      }
      toast.success('Profile updated successfully', {
        richColors: true,
        position: 'top-center',
        duration: 3000,
      })
    } catch (error) {
      return toast.error('Something went wrong', { richColors: true, position: 'top-center' })
    }
  }

  return (
    <div className="card-hover overflow-hidden rounded-xl border bg-card shadow-md dark:bg-neutral-900">
      <div className="p-6">
        <div className="mb-4 flex items-center">
          <div className="mr-3 flex items-center justify-center rounded-full bg-primary p-2.5 shadow-md">
            <FaUserEdit size={24} className="text-white" />
          </div>
          <h2 className="text-xl font-semibold">Edit Profile</h2>
        </div>
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
                        placeholder="Enter your full name"
                        id="name"
                        {...field}
                        className="h-12 pl-9"
                        autoComplete="name"
                      />
                      <FaUser className="absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="email"
                        placeholder="Enter your email"
                        {...field}
                        className="h-12 pl-9"
                        defaultValue={user.email}
                        autoComplete="email"
                        disabled
                      />
                      <FaEnvelope className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-300 dark:text-neutral-600" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="h-12 w-full cursor-pointer bg-primary text-base text-white hover:bg-primary/90"
            >
              <FaSave />
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ProfileForm
