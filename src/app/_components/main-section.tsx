'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useDeleteUserFromCity, useGetUsersByCity } from '../_services'
import { LinearSkeleton } from '@/components/extended-skeleton'
import { Typography } from '@/components/typography'
import { Icon } from '@/components/icon'
import { Fragment, useState } from 'react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { DroppableContainer } from '@/components/dnd-kit/droppable-container'
import { useDisclosure } from '@/lib/hooks/use-disclosure'
import { DeleteUser } from './delete-user'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const MainSection = () => {
	const { data, isLoading } = useGetUsersByCity()
	const [value, setValue] = useState<string>('')
	const disclosure = useDisclosure()
	const [state, setState] = useState<{ userId: number; cityId: number } | null>(null)
	const queryClient = useQueryClient()

	const { isPending, mutate } = useDeleteUserFromCity()

	if (isLoading || !data)
		return (
			<div className='w-full'>
				<LinearSkeleton />
			</div>
		)

	const onContinue = () => {
		if (!state?.userId && !state?.cityId) return
		mutate(state, {
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
		})
	}

	return (
		<>
			<Accordion type='single' collapsible value={value} onValueChange={v => setValue(v)}>
				{data.payload.map(city => {
					return (
						<AccordionItem
							key={city.id}
							value={city.name}
							className={cn({
								'border-2 border-fatdog rounded-md': value === city.name,
							})}>
							<AccordionTrigger className='hover:no-underline'>
								<div className='flex flex-row items-center'>
									<Typography variant={'p5'} className='font-semibold text-fatdog-text '>
										City:{' '}
										<Typography variant={'p4'} component='span' className='text-fatdog-text '>
											{city.name}
										</Typography>
									</Typography>
								</div>
								<div className=' ml-auto mr-4 flex flex-row items-center gap-1'>
									<Icon icon='fileText' />
									<Typography variant={'p5'} className='text-fatdog-text '>
										{city.users.length} User
									</Typography>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								{city.users.map((user, idx) => {
									return (
										<Fragment key={user.id}>
											<div className='flex items-center flex-row justify-between my-2 '>
												<div>
													<Typography variant={'p4'} className='font-medium'>
														{user.name}
													</Typography>
													<div className='flex flex-row items-center gap-2'>
														<Icon icon='backpack' className='text-fatdog-foreground' />
														<Typography variant={'p5'} className='text-fatdog-text'>
															{user.role.title}
														</Typography>
													</div>
												</div>
												<Icon
													icon='trash'
													onClick={() => {
														setState({ userId: user.id, cityId: city.id })
														disclosure.onToggle()
													}}
												/>
											</div>
											{idx !== city.users.length - 1 && <Separator />}
										</Fragment>
									)
								})}
								<DroppableContainer data={city} />
							</AccordionContent>
						</AccordionItem>
					)
				})}
			</Accordion>
			<DeleteUser isLoading={isPending} onContinue={onContinue} disclosure={disclosure} />
		</>
	)
}
