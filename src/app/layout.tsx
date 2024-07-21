import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { ReactQueryClientProvider } from '@/components/providers/query-client-provider'
import { Toaster } from '@/components/ui/sonner'

const montserrat = Montserrat({
	subsets: ['latin'],
	fallback: ['sans-serif'],
	preload: true,
})

export const metadata: Metadata = {
	title: 'Fatdog Interview Task',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={montserrat.className}>
				<ReactQueryClientProvider>{children}</ReactQueryClientProvider>
				<Toaster />
			</body>
		</html>
	)
}
