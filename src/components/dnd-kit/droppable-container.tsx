import { useDroppable } from '@dnd-kit/core'
import { Typography } from '../typography'
import type { UserCities } from '@/app/_services'

type DroppableContainerProps = {
	data: UserCities
}

export const DroppableContainer = ({ data }: DroppableContainerProps) => {
	const { setNodeRef } = useDroppable({
		id: data.id.toString(),
		data,
	})

	return (
		<div
			ref={setNodeRef}
			className='h-20 mt-4 px-8 py-3 border-2 border-dashed border-fatdog rounded-sm flex items-center justify-center'>
			<Typography variant={'p5'}>Drag items from the users list</Typography>
		</div>
	)
}
