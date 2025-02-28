import D20Logo from '@/assets/D20';
import { AuthButton } from '@/components/LoginButton/index';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='flex bg-primary font-[family-name:var(--font-inter)]'>
			<aside className='bg-secondary p-10 flex flex-col justify-between items-center'>
				<nav>
					<div className='bg-terciary flex justify-center p-3 rounded-full w-36 h-36 items-center'>
						<D20Logo
							className='w-28 h-28'
							stroke='#31465e'
						/>
					</div>
				</nav>
				<div>
					<AuthButton />
				</div>
			</aside>
			{children}
		</div>
	);
}
