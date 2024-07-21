import { cn } from '@/lib/utils'
import { Controller, type FieldPath, type FieldValues, useFormContext } from 'react-hook-form'
import { Typography } from '../typography'
import { Input, type InputProps } from '../ui/input'
import { FormGroup } from './form-group'
import type { GenericFormProps } from './form.types'

interface FormInputProps<TFieldValues extends FieldValues> extends GenericFormProps, InputProps {
	name: FieldPath<TFieldValues>
	helperText?: string
}

export const FormInput = <TForm extends FieldValues>({
	name,
	isRequired,
	label,
	groupClassName,
	className,
	helperText,
	...props
}: FormInputProps<TForm>) => {
	const { control } = useFormContext<TForm>()

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, ...other }, fieldState: { error } }) => (
				<FormGroup name={name} label={label} isRequired={isRequired} errors={error} className={groupClassName}>
					<Input
						onChange={event => {
							onChange(event.target.value)
						}}
						{...other}
						{...props}
						className={cn('', {
							'border-destructive text-destructive focus-visible:ring-0 ': error,
						})}
					/>
					{helperText && (
						<Typography component='span' variant={'p4'} className='text-gray-500'>
							{helperText}
						</Typography>
					)}
				</FormGroup>
			)}
		/>
	)
}
