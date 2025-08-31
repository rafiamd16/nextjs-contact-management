'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { signInGithub, signInGoogle } from '@/lib/actions/user-action'
import { useRouter } from 'next/navigation'
import { FaTimes, FaTrashAlt } from 'react-icons/fa'
import { IoLogoGithub, IoLogoGoogle } from 'react-icons/io5'
import { toast } from 'sonner'

export const GoogleButton = () => {
  return (
    <form action={signInGoogle} className="w-full">
      <Button
        type="submit"
        variant="outline"
        className="h-11 w-full cursor-pointer font-medium shadow duration-300 ease-linear hover:-translate-y-0.5"
      >
        <IoLogoGoogle />
        Google
      </Button>
    </form>
  )
}

export const GithubButton = () => {
  return (
    <form action={signInGithub} className="w-full">
      <Button
        type="submit"
        variant="outline"
        className="h-11 w-full cursor-pointer font-medium shadow duration-300 ease-linear hover:-translate-y-0.5"
      >
        <IoLogoGithub />
        Github
      </Button>
    </form>
  )
}

interface DeleteBtnProps<T> {
  id: T
  onDelete: (id: T) => Promise<unknown>
  description?: string
  mutate?: () => void
}

export const DeleteButton = <T,>({
  id,
  description = 'Account',
  onDelete,
  mutate,
}: DeleteBtnProps<T>) => {
  const handleDelete = async () => {
    try {
      await onDelete(id)
      toast.success(`${description} deleted successfully`, {
        richColors: true,
        position: 'top-center',
        duration: 3000,
      })
      mutate?.()
    } catch (error) {
      toast.error('Something went wrong', { richColors: true, position: 'top-center' })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          className="cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-md"
        >
          <FaTrashAlt />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your data and remove from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const DeleteAllButton = ({
  data,
  description = 'Account',
  onDelete,
  mutate,
}: {
  data: any
  description?: string
  onDelete: () => Promise<unknown>
  mutate: () => void
}) => {
  const handleDelete = async () => {
    if (data.length === 0)
      return toast.error('No data found', { richColors: true, position: 'top-center' })

    try {
      await onDelete()
      toast.success(`All ${description} have been successfully deleted.`, {
        richColors: true,
        position: 'top-center',
        duration: 3000,
      })
      mutate()
    } catch (error) {
      toast.error('Something went wrong', { richColors: true, position: 'top-center' })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" size="icon" className="w-max cursor-pointer">
          <span className="text-[10px] text-red-500 transition hover:text-red-600 hover:underline sm:text-sm">
            Delete All {description}
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all your data and remove from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const BackFormButton = () => {
  const { back } = useRouter()

  return (
    <Button
      variant="outline"
      onClick={() => back()}
      type="button"
      className="h-12 w-full cursor-pointer font-medium shadow transition-all hover:-translate-y-0.5 hover:opacity-80 hover:shadow-lg sm:w-auto"
    >
      <FaTimes size={24} />
      Cancel
    </Button>
  )
}
