'use client'

import { BackFormButton } from '@/components/buttons'
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
import { createContact, updateContact } from '@/lib/actions/contact-action'
import { ContactFormSchema, contactFormSchema } from '@/lib/validations/contact-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FaPlusCircle, FaSave } from 'react-icons/fa'
import { FaPhone, FaUserTag } from 'react-icons/fa6'
import { IoMail } from 'react-icons/io5'
import { toast } from 'sonner'

interface Props {
  mode: 'create' | 'edit'
  defaultValues?: ContactFormSchema
  contactId?: string
}

const ContactForm = ({ mode, contactId, defaultValues }: Props) => {
  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  })
  const { back } = useRouter()

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form

  const handleFormSubmit = async (data: ContactFormSchema) => {
    try {
      if (mode === 'create') {
        await createContact(data)
      } else if (mode === 'edit' && contactId) {
        await updateContact(contactId, data)
      }
      reset()
      mode === 'create' ? back() : null
      toast.success(
        mode === 'create' ? 'Contact created successfully' : 'Contact updated successfully',
        {
          position: 'top-center',
          richColors: true,
        }
      )
    } catch (_) {
      return toast.error('Something went wrong', { richColors: true, position: 'top-center' })
    }
  }

  return (
    <div className="card-hover mx-auto max-w-2xl overflow-hidden rounded-xl border bg-card shadow-md">
      <div className="p-8">
        <Form {...form}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="flex flex-col items-center gap-y-6 md:flex-row md:gap-4">
              <FormField
                control={control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="md:1/2 w-full">
                    <FormLabel htmlFor="first_name">First Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter first name"
                          id="first_name"
                          {...field}
                          className="h-12 pl-9"
                          autoComplete="name"
                        />
                        <FaUserTag className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="last_name"
                render={({ field }) => (
                  <FormItem className="md:1/2 w-full">
                    <FormLabel htmlFor="last_name">Last Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter last name"
                          id="last_name"
                          {...field}
                          className="h-12 pl-9"
                          autoComplete="name"
                        />
                        <FaUserTag className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter email address"
                        id="email"
                        type="email"
                        {...field}
                        className="h-12 pl-9"
                        autoComplete="email"
                      />
                      <IoMail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone">Phone</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter phone number"
                        id="phone"
                        {...field}
                        className="h-12 pl-9"
                        autoComplete="tel"
                      />
                      <FaPhone className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-6 flex flex-col-reverse justify-end gap-4 sm:flex-row">
              <BackFormButton />
              <Button
                type="submit"
                className="bg-gradient h-12 w-full cursor-pointer font-medium text-white shadow transition-all hover:-translate-y-0.5 hover:opacity-80 hover:shadow-lg sm:w-auto"
                disabled={isSubmitting}
              >
                {mode === 'create' ? <FaPlusCircle size={24} /> : <FaSave size={24} />}
                {isSubmitting
                  ? mode === 'create'
                    ? 'Creating...'
                    : 'Saving...'
                  : mode === 'create'
                    ? 'Create'
                    : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ContactForm
