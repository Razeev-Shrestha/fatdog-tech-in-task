'use client'

import { DraggableItem } from '@/components/dnd-kit/draggable-item'
import { useDeleteUser, useGetUsers } from '../_services'
import { LinearSkeleton } from '@/components/extended-skeleton'
import { Typography } from '@/components/typography'
import { Icon } from '@/components/icon'
import { ExtendedButton } from '@/components/extended-button'
import { CreateUser } from './create-user-dialog'
import { useDisclosure } from '@/lib/hooks/use-disclosure'
import { useState } from 'react'
import { DeleteUser } from './delete-user'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

export const UserList = () => {
	const { data, isLoading } = useGetUsers()
	const disclosure = useDisclosure()
	const [id, setId] = useState<number | null>(null)
	const { isPending, mutate } = useDeleteUser()
	const queryClient = useQueryClient()

	if (!data || isLoading)
		return (
			<div className='flex flex-col w-full gap-3'>
				{Array.from({ length: 3 }).map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<LinearSkeleton key={i} />
				))}
			</div>
		)

	const onContinue = () => {
		if (!id) return
		mutate(
			{ id },
			{
				onError: () => {
					toast.error('Something went wrong.')
				},
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: ['users-by-cities'],
					})
					queryClient.invalidateQueries({
						queryKey: ['users'],
					})
					toast.success('User deleted successfully.')
					disclosure.onClose()
				},
			}
		)
	}

	return (
		<>
			<div className='px-2 py-3'>
				{data.payload.map(user => {
					return (
						<DraggableItem key={user.id} data={user}>
							<div>
								<Typography variant={'p4'} className='font-medium'>
									{user.name}
								</Typography>
								<div className='flex flex-row items-center gap-3'>
									<Icon icon='backpack' className='text-fatdog-foreground' />
									<Typography variant={'p5'} className='text-tertiary'>
										{user.role.title}
									</Typography>
								</div>
							</div>
							<Icon
								icon='trash'
								className='ml-auto'
								onClick={() => {
									setId(user.id)
									disclosure.onToggle()
								}}
							/>
						</DraggableItem>
					)
				})}
				<CreateUser />
			</div>
			<DeleteUser isLoading={isPending} onContinue={onContinue} disclosure={disclosure} />
		</>
	)
}
