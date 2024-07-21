'use client'

import { useDraggable } from '@dnd-kit/core'
import { Button } from '../ui/button'
import { Icon } from '../icon'
import type { SelectUser } from '@/db/models'

export const DraggableItem: React.FC<React.PropsWithChildren<{ data: SelectUser }>> = ({ children, data }) => {
	const { isDragging, setNodeRef, setActivatorNodeRef, listeners, attributes } = useDraggable({
		id: data.id.toString(),
		data,
	})

	const style = {
		opacity: isDragging ? 0.5 : 1,
	}

	return (
		<div ref={setNodeRef} style={style} {...attributes} className='flex flex-row items-center gap-3 py-2'>
			<Button {...listeners} ref={setActivatorNodeRef} className='p-0' variant={'unstyled'}>
				<Icon icon='dragHandle' className='hover:cursor-grabbing' />
			</Button>
			{children}
		</div>
	)
}
