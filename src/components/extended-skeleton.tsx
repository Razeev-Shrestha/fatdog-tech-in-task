import { Skeleton } from './ui/skeleton'

export const LinearSkeleton = () => {
	return <Skeleton className='h-10' />
}

export const CircularSkeleton = () => {
	return <Skeleton className='size-10 rounded-full' />
}
