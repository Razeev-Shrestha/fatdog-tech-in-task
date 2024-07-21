import {
	DragHandleDots2Icon,
	TrashIcon,
	FileTextIcon,
	BackpackIcon,
	ReloadIcon,
	CircleIcon,
	PlusIcon,
} from '@radix-ui/react-icons'
import type { IconProps as RadixIconProps } from '@radix-ui/react-icons/dist/types'

const iconsCollection = {
	dragHandle: DragHandleDots2Icon,
	trash: TrashIcon,
	fileText: FileTextIcon,
	backpack: BackpackIcon,
	loader: ReloadIcon,
	circle: CircleIcon,
	plus: PlusIcon,
}

export interface IconProps extends RadixIconProps {
	icon: keyof typeof iconsCollection
}

export const Icon: React.FC<IconProps> = ({ icon, ...props }) => {
	const IconComponent = iconsCollection[icon]

	if (!IconComponent) throw new Error(`Icon ${icon} not found`)

	return <IconComponent {...props} />
}
