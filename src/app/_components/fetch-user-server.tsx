import { fetcher } from '@/lib/api-handlers'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { UserList } from './user-list'

export const AllUsersList = async () => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['users'],
		queryFn: async () => await fetcher({ url: '/users' }),
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<UserList />
		</HydrationBoundary>
	)
}
