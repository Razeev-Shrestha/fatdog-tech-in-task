import { RootContainer } from '@/components/root-container'
import { Typography } from '@/components/typography'
import { DragAndDropContainer } from './_components/drag-and-drop-container'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { CreateUserByCity } from './_components/create-user-by-city'
import { CreateCity } from './_components/create-city'

import { AllUsersList } from './_components/fetch-user-server'
import { CitiesList } from './_components/fetch-cities-server'

export default function Home() {
	return (
		<main className='bg-fatdog-background h-screen w-screen'>
			<RootContainer>
				<DragAndDropContainer>
					<div className='col-span-1' />
					<div className='col-span-8 bg-fatdog/5 px-3 py-4'>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between'>
								<Typography variant={'h2'}>Create User By City</Typography>
								<CreateCity />
							</CardHeader>
							<CardContent>
								<CitiesList />
							</CardContent>
							<CardFooter>
								<CreateUserByCity />
							</CardFooter>
						</Card>
					</div>
					<div className='col-span-3 p-4'>
						<Typography variant='p4' className='font-semibold text-fatdog-text'>
							User List
						</Typography>
						<AllUsersList />
					</div>
				</DragAndDropContainer>
			</RootContainer>
		</main>
	)
}
