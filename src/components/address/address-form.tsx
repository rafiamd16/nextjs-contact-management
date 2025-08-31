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
import { createAddress, updateAddress } from '@/lib/actions/address-action'
import { addressFormSchema, AddressFormSchema } from '@/lib/validations/address-validation'
import { Contact } from '@/types/contact'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FaMailBulk, FaPlusCircle, FaSave } from 'react-icons/fa'
import { FaCity, FaFlag, FaMap, FaRoad, FaUser } from 'react-icons/fa6'
import { toast } from 'sonner'

interface Props {
  mode: 'create' | 'edit'
  defaultValues?: AddressFormSchema
  addressId?: string
  contactId?: string
  contact: Contact
}

const AddressForm = ({ mode, defaultValues, addressId, contactId, contact }: Props) => {
  const form = useForm<AddressFormSchema>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: defaultValues,
  })

  const { back } = useRouter()

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: AddressFormSchema) => {
    if (mode === 'create') {
      await createAddress(contactId as string, data)
    } else if (mode === 'edit' && addressId) {
      await updateAddress(contactId as string, addressId, data)
    }
    reset()
    mode === 'create' ? back() : null
    toast.success(
      `${mode === 'create' ? 'Address created successfully' : 'Address updated successfully'}`,
      { richColors: true, position: 'top-center' }
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-hover mx-auto max-w-2xl overflow-hidden rounded-xl border bg-card shadow-md">
        <div className="p-8">
          <div className="mb-6 border-b border-gray-700 pb-6">
            <div className="flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 shadow-md">
                <FaUser className="size-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {contact.first_name} {contact.last_name}
                </h2>
                <p className="text-sm">
                  {contact.email} • {contact.phone}
                </p>
              </div>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col items-center gap-y-6 md:flex-row md:gap-4">
                <FormField
                  control={control}
                  name="street"
                  render={({ field }) => (
                    <FormItem className="md:1/2 w-full">
                      <FormLabel htmlFor="street">Street</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter street address"
                            id="street"
                            {...field}
                            className="h-12 pl-9"
                            autoComplete="street-address"
                          />
                          <FaRoad className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="md:1/2 w-full">
                      <FormLabel htmlFor="city">City</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter city"
                            id="city"
                            {...field}
                            className="h-12 pl-9"
                          />
                          <FaCity className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="province">Province</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter province or state"
                          id="province"
                          {...field}
                          className="h-12 pl-9"
                        />
                        <FaMap className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="country">Country</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter country"
                          id="country"
                          {...field}
                          className="h-12 pl-9"
                          autoComplete="country"
                        />
                        <FaFlag className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="postal_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="postal_code">Postal Code</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter postal_code"
                          id="postal_code"
                          {...field}
                          className="h-12 pl-9"
                          autoComplete="postal-code"
                        />
                        <FaMailBulk className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
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
    </motion.div>
  )
}

export default AddressForm
