import { Typography } from '../typography'

interface FormLabelProps {
	label: string
	isRequired?: boolean
}

export const FormLabel = ({ label, isRequired }: FormLabelProps) => {
	return label ? (
		<Typography variant={'p5'} component='span'>
			{label}
			{isRequired && (
				<Typography variant={'h5'} component='span' className='text-destructive ml-1'>
					*
				</Typography>
			)}
		</Typography>
	) : null
}
