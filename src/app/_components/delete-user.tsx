import { ExtendedButton } from '@/components/extended-button'
import { Icon } from '@/components/icon'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { DisclosureProps } from '@/lib/hooks/use-disclosure'

interface DeleteUserProps {
	onContinue: () => void
	isLoading: boolean
	disclosure: DisclosureProps
}

export const DeleteUser = ({ isLoading, onContinue, disclosure }: DeleteUserProps) => {
	const { isOpen, onClose, onToggle } = disclosure
	return (
		<Dialog open={isOpen} onOpenChange={onToggle}>
			<DialogContent onInteractOutside={e => e.preventDefault()}>
				<DialogHeader>
					<DialogTitle>Delete User</DialogTitle>
				</DialogHeader>
				<div>Do you want to delete the user ?</div>
				<DialogFooter>
					<ExtendedButton className='bg-destructive' onClick={onClose}>
						Cancel
					</ExtendedButton>
					<ExtendedButton className='bg-primary' onClick={onContinue} isLoading={isLoading}>
						Continue
					</ExtendedButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
