'use client'

import { DndContext } from '@dnd-kit/core'

export const DragAndDropContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
	return <DndContext>{children}</DndContext>
}
