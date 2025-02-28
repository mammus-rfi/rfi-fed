'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import D20Logo from '@/assets/D20';
import { AuthButton } from '@/components/LoginButton';

export default function Home() {
	const { status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'authenticated') {
			router.replace('/dashboard');
		}
	}, [status, router]);

	return (
		<div className='bg-secondary w-screen h-screen'>
			<main className='flex w-full h-full items-center justify-center'>
				<div className='bg-primary w-96 h-96 flex flex-col items-center justify-evenly rounded-3xl text-color-text'>
					<D20Logo />
					<h1 className='font-[family-name:var(--font-kanit)] font-extrabold text-2xl'>
						ROLL FOR INITIATIVE
					</h1>
					<AuthButton />
				</div>
			</main>
		</div>
	);
}
