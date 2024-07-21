import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Icon } from './icon'

export interface ExtendedButtonProps extends ButtonProps {
	endContent?: React.ReactNode
	startContent?: React.ReactNode
	isLoading?: boolean
}

export const ExtendedButton: React.FC<ExtendedButtonProps> = ({
	startContent,
	isLoading,
	endContent = isLoading ? <Icon icon='circle' className='animate-spin' /> : null,
	children,
	...props
}) => {
	return (
		<Button
			{...props}
			className={cn(
				'bg-fatdog',
				{
					'gap-2': startContent || endContent,
				},
				props.className
			)}
			disabled={props.disabled || isLoading}>
			{startContent}
			{children}
			{endContent}
		</Button>
	)
}
