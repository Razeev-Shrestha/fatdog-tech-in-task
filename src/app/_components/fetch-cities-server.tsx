import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { MainSection } from './main-section'
import { fetcher } from '@/lib/api-handlers'

export const CitiesList = async () => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['users-by-cities'],
		queryFn: async () => await fetcher({ url: '/cities' }),
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<MainSection />
		</HydrationBoundary>
	)
}
