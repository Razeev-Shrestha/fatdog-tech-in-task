import { RootContainer } from "@/components/root-container";
import { Typography } from "@/components/typography";

export default function Home() {
	return (
		<main className="bg-fatdog-background h-screen w-screen">
			<RootContainer>
				<div className="col-span-1">1</div>
				<div className="col-span-8 bg-fatdog/5">2</div>
				<div className="col-span-3 p-4">
					<Typography variant="p4" className="font-semibold text-fatdog-text">
						User List
					</Typography>
				</div>
			</RootContainer>
		</main>
	);
}
