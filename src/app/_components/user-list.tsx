'use client'

import { DraggableItem } from '@/components/dnd-kit/draggable-item'
import { useGetUsers } from '../_services'
import { LinearSkeleton } from '@/components/extended-skeleton'
import { Typography } from '@/components/typography'
import { Icon } from '@/components/icon'
import { ExtendedButton } from '@/components/extended-button'
import { CreateUser } from './create-user-dialog'

export const UserList = () => {
	const { data, isLoading } = useGetUsers()

	if (!data || isLoading)
		return (
			<div className='flex flex-col w-full gap-3'>
				{Array.from({ length: 3 }).map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<LinearSkeleton key={i} />
				))}
			</div>
		)

	return (
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
					</DraggableItem>
				)
			})}
			<CreateUser />
		</div>
	)
}
