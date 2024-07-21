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
import { type InsertUser, insertUserSchema } from '@/db/models'
import { useDisclosure } from '@/lib/hooks/use-disclosure'
import { useForm } from '@/lib/hooks/use-form'
import { FormProvider } from 'react-hook-form'
import { SelectRole } from './select-inputs'
import { useCreateUser } from '../_services'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const CreateUser = () => {
	const { isOpen, onToggle, onClose } = useDisclosure()
	const { mutate, isPending } = useCreateUser()
	const queryClient = useQueryClient()

	const form = useForm<InsertUser>(
		{
			defaultValues: {
				name: '',
			},
		},
		insertUserSchema
	)

	const onFormSubmit = form.handleSubmit(data => {
		mutate(data, {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ['users'],
				})
				toast.success('User created successfully.')
				form.reset()
				onClose()
			},
			onError: () => toast.error('Failed to create user.'),
		})
	})

	const onCancel = () => {
		form.reset()
		onClose()
	}

	return (
		<Dialog open={isOpen} onOpenChange={onToggle}>
			<DialogTrigger asChild>
				<ExtendedButton className='w-full mt-4'>Create User</ExtendedButton>
			</DialogTrigger>
			<DialogContent onInteractOutside={e => e.preventDefault()} className=''>
				<DialogHeader>
					<DialogTitle>Create User</DialogTitle>
					<DialogDescription>Create a new user.</DialogDescription>
				</DialogHeader>
				<FormProvider {...form}>
					<form onSubmit={onFormSubmit} className='flex gap-3 flex-col'>
						<FormInput<InsertUser> name='name' label='Name' placeholder='Enter name' isRequired />
						<SelectRole />
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
