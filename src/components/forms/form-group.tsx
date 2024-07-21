import { cn } from '@/lib/utils'
import { ErrorMessage } from '@hookform/error-message'

import { Typography } from '../typography'
import { FormLabel } from './form-label'

interface FormGroupProps extends React.PropsWithChildren {
	name: string
	label?: string
	isRequired?: boolean
	errors?: Record<string, unknown>
	className?: string
}

export const FormGroup = ({ children, className, name, label, isRequired, errors }: FormGroupProps) => {
	return (
		<div className={cn('flex flex-col gap-2 w-full', className)}>
			{label && <FormLabel label={label} isRequired={isRequired} />}
			{children}
			{errors && (
				<ErrorMessage
					name={name}
					render={({ message }) => (
						<Typography variant={'p5'} component='p' className='text-destructive'>
							{message}
						</Typography>
					)}
				/>
			)}
		</div>
	)
}
