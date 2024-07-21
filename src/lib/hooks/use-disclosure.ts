import { useState } from 'react'

export type DisclosureProps = {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
	onToggle: () => void
}

export const useDisclosure = (): DisclosureProps => {
	const [isOpen, setIsOpen] = useState(false)

	const onOpen = () => {
		setIsOpen(true)
	}

	const onClose = () => {
		setIsOpen(false)
	}

	const onToggle = () => {
		setIsOpen(!isOpen)
	}

	return {
		isOpen,
		onOpen,
		onClose,
		onToggle,
	}
}
