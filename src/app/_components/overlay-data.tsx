import { Icon } from '@/components/icon'
import { Typography } from '@/components/typography'
import type { SelectUser } from '@/db/models'

interface IOverLayDataProps {
	data: SelectUser
}

export const OverLayData = ({ data }: IOverLayDataProps) => {
	return (
		<div className='bg-card rounded-md w-64 border p-3'>
			<Typography variant={'p4'} className='font-medium'>
				{data.name}
			</Typography>
			<div className='flex flex-row items-center gap-2'>
				<Icon icon='backpack' className='text-fatdog-foreground' />
				<Typography variant={'p5'} className='text-fatdog-text'>
					{data.role.title}
				</Typography>
			</div>
		</div>
	)
}
