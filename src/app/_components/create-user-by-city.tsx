'use client'

import { ExtendedButton } from '@/components/extended-button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useDisclosure } from '@/lib/hooks/use-disclosure'
import { useForm } from '@/lib/hooks/use-form'
import { type CreateUserByCityType, createUserByCitySchema } from '../_schema'
import { FormProvider } from 'react-hook-form'
import { FormInput } from '@/components/forms/form-input'
import { SelectCity, SelectRoleForUser } from './select-inputs'
import { useCreateUserByCity } from '../_services'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

export const CreateUserByCity = () => {
	const { isOpen, onClose, onToggle } = useDisclosure()
	const { mutate, isPending } = useCreateUserByCity()
	const queryClient = useQueryClient()

	const form = useForm<CreateUserByCityType>(
		{
			defaultValues: {
				user: {
					name: '',
				},
			},
		},
		createUserByCitySchema
	)

	const onFormSubmit = form.handleSubmit(data => {
		mutate(data, {
			onSuccess: () => {
				queryClient.invalidateQueries({
					predicate: q => q.queryKey[0] === 'users',
				})
				queryClient.invalidateQueries({
					predicate: q => q.queryKey[0] === 'users-by-cities',
				})
				toast.success('User created successfully.')
				form.reset()
				onClose()
			},
			onError: () => {
				toast.error('Failed to create user by city.')
			},
		})
	})

	const onCancel = () => {
		form.reset()
		onClose()
	}

	return (
		<Dialog onOpenChange={onToggle} open={isOpen}>
			<DialogTrigger asChild>
				<ExtendedButton className='w-full'>Create user by city</ExtendedButton>
			</DialogTrigger>
			<DialogContent onInteractOutside={e => e.preventDefault()}>
				<DialogHeader>
					<DialogTitle>Create User By City</DialogTitle>
					<DialogDescription>Create a new user by choosing a city.</DialogDescription>
				</DialogHeader>
				<FormProvider {...form}>
					<form onSubmit={onFormSubmit} className='flex flex-col gap-3'>
						<FormInput<CreateUserByCityType> name='user.name' label='Name' placeholder='Enter name' isRequired />
						<SelectRoleForUser />
						<SelectCity />
						<DialogFooter>
							<ExtendedButton type='button' onClick={onCancel} variant={'destructive'} className='bg-destructive'>
								Cancel
							</ExtendedButton>
							<ExtendedButton type='submit' variant={'default'} className='bg-primary' isLoading={isPending}>
								Save
							</ExtendedButton>
						</DialogFooter>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	)
}
