import { RootContainer } from '@/components/root-container'
import { Typography } from '@/components/typography'
import { UserList } from './_components/user-list'
import { DragAndDropContainer } from './_components/drag-and-drop-container'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { CreateUserByCity } from './_components/create-user-by-city'

export default function Home() {
	return (
		<main className='bg-fatdog-background h-screen w-screen'>
			<RootContainer>
				<DragAndDropContainer>
					<div className='col-span-1' />
					<div className='col-span-8 bg-fatdog/5 px-3 py-4'>
						<Card>
							<CardHeader>
								<Typography variant={'h2'}>Create User By City</Typography>
							</CardHeader>
							<CardFooter>
								<CreateUserByCity />
							</CardFooter>
						</Card>
					</div>
					<div className='col-span-3 p-4'>
						<Typography variant='p4' className='font-semibold text-fatdog-text'>
							User List
						</Typography>
						<UserList />
					</div>
				</DragAndDropContainer>
			</RootContainer>
		</main>
	)
}
