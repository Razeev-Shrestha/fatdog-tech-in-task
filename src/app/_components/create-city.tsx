'use client'

import { ExtendedButton } from '@/components/extended-button'
import { FormInput } from '@/components/forms/form-input'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { type InsertCity, insertCitySchema } from '@/db/models'
import { useDisclosure } from '@/lib/hooks/use-disclosure'
import { useForm } from '@/lib/hooks/use-form'
import { FormProvider } from 'react-hook-form'
import { SelectRole } from './select-inputs'
import { useCreateCity } from '../_services'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Icon } from '@/components/icon'

export const CreateCity = () => {
	const { isOpen, onToggle, onClose } = useDisclosure()
	const { mutate, isPending } = useCreateCity()
	const queryClient = useQueryClient()

	const form = useForm<InsertCity>(
		{
			defaultValues: {
				name: '',
			},
		},
		insertCitySchema
	)

	const onFormSubmit = form.handleSubmit(data => {
		mutate(data, {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ['users-by-cities'],
				})
				toast.success('City created successfully.')
				form.reset()
				onClose()
			},
			onError: () => toast.error('Failed to create city.'),
		})
	})

	const onCancel = () => {
		form.reset()
		onClose()
	}

	return (
		<Dialog open={isOpen} onOpenChange={onToggle}>
			<DialogTrigger asChild>
				<ExtendedButton>
					<Icon icon='plus' />
				</ExtendedButton>
			</DialogTrigger>
			<DialogContent onInteractOutside={e => e.preventDefault()} className=''>
				<DialogHeader>
					<DialogTitle>Create city</DialogTitle>
					<DialogDescription>Create a new city.</DialogDescription>
				</DialogHeader>
				<FormProvider {...form}>
					<form onSubmit={onFormSubmit} className='flex gap-3 flex-col'>
						<FormInput<InsertCity> name='name' label='Name' placeholder='Enter name' isRequired />
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
