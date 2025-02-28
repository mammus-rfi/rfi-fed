import './globals.css';
import type { Metadata } from 'next';
import { Inter, Kanit } from 'next/font/google';
import { AuthProvider } from '@/components/SessionProvider';

const kanit = Kanit({
	variable: '--font-kanit',
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: 'Roll For Initiative',
	description: 'Mammus RPG App',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${kanit.variable} ${inter.variable} antialiased text-color-text`}
			>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
