import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@/components/providers/query-client-provider";

const montserrat = Montserrat({
	subsets: ["latin"],
	fallback: ["sans-serif"],
	preload: true,
});

export const metadata: Metadata = {
	title: "Fatdog Interview Task",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<ReactQueryClientProvider>{children}</ReactQueryClientProvider>
			</body>
		</html>
	);
}
