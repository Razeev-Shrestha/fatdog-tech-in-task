import { Controller, type FieldPath, type FieldValues, useFormContext } from 'react-hook-form'
import { Typography } from '../typography'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { FormGroup } from './form-group'
import type { GenericFormProps } from './form.types'

interface FormSelectProps<TFieldValues extends FieldValues, TOptionValue> extends GenericFormProps {
	name: FieldPath<TFieldValues>
	placeHolder: string
	options: {
		label: string
		value: TOptionValue
		disabled?: boolean
	}[]
}

export const FormSelect = <TForm extends FieldValues, TOptionValue = string | number | boolean>({
	name,
	isRequired,
	label,
	groupClassName,
	placeHolder,
	options,
}: FormSelectProps<TForm, TOptionValue>) => {
	const { control } = useFormContext<TForm>()

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => {
				const selectedValue = options.find(option => String(option.value) === String(field.value))?.label

				return (
					<FormGroup name={name} label={label} isRequired={isRequired} errors={error} className={groupClassName}>
						<Select
							defaultValue={selectedValue}
							onValueChange={value => field.onChange(typeof options[0].value === 'number' ? Number(value) : value)}>
							<SelectTrigger className='bg-background py-3'>
								{selectedValue ? selectedValue : <SelectValue placeholder={placeHolder} />}
							</SelectTrigger>
							<SelectContent className='w-full'>
								{options.map(option => (
									<SelectItem
										key={option.label}
										value={option.value as string}
										className='py-2 flex flex-row items-center justify-between w-full '
										disabled={option.disabled}>
										<Typography component='span' variant={'p5'} className='text-fatdog-text'>
											{option.label}
										</Typography>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormGroup>
				)
			}}
		/>
	)
}
