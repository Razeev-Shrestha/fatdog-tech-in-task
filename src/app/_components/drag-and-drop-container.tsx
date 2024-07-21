'use client'

import type { SelectUser } from '@/db/models'
import {
	closestCorners,
	DndContext,
	KeyboardSensor,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
	defaultDropAnimation,
	type DropAnimation,
	type DragStartEvent,
	type DragOverEvent,
	type DragEndEvent,
	DragOverlay,
} from '@dnd-kit/core'
import { useState } from 'react'
import { OverLayData } from './overlay-data'
import { type ApiResponseType, useAddUserToCity } from '../_services'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const DragAndDropContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [activeData, setActiveData] = useState<SelectUser | null>(null)
	const { mutate } = useAddUserToCity()
	const queryClient = useQueryClient()

	const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor), useSensor(TouchSensor))

	const dropAnimation: DropAnimation = {
		...defaultDropAnimation,
	}

	const handleDragStart = (ev: DragStartEvent) => {
		setActiveData(ev.active.data.current as SelectUser)
	}

	const handleDragOver = (ev: DragOverEvent) => {
		if (!ev.over && !ev.active) return

		const { active, over } = ev

		if (!over?.data.current) return

		const userId = (active.data.current as SelectUser).id

		queryClient.setQueryData<ApiResponseType<SelectUser[]>>(['users'], oldData => {
			console.log('old data', oldData)
			if (oldData) {
				return {
					...oldData,
					payload: oldData.payload.filter(user => user.id !== userId),
				}
			}
		})
	}

	const handleDragEnd = (ev: DragEndEvent) => {
		if (!ev.over && !ev.active) return

		const { active, over } = ev

		if (!over?.data.current) return

		const userId = Number(active.id)

		const cityId = (over?.data.current as { id: number }).id

		mutate(
			{ cityId, userId },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						predicate: q => q.queryKey[0] === 'users-by-cities',
					})

					queryClient.invalidateQueries({
						predicate: q => q.queryKey[0] === 'users',
					})

					toast.success('User added to city successfully.')
				},
				onError: () => {
					toast.error('Failed to add user to city.')
				},
			}
		)

		setActiveData(null)
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCorners}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}>
			{children}
			<DragOverlay dropAnimation={dropAnimation}>{activeData ? <OverLayData data={activeData} /> : null}</DragOverlay>
		</DndContext>
	)
}
