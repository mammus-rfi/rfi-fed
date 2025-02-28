'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { IoMdExit } from 'react-icons/io';
import Image from 'next/image';

export function AuthButton() {
	const { data: session } = useSession();

	return session ? (
		<div className='flex flex-col w-40'>
			<p>Olá, {session.user?.name}!</p>
			<div className='flex justify-between'>
				<Image
					src={session.user.image!}
					alt='Avatar'
					width={50}
					height={50}
					className='rounded-full'
				/>
				<button
					className='bg-error rounded-xl w-10 h-10 flex justify-center items-center self-end cursor-pointer'
					onClick={() => signOut()}
				>
					<IoMdExit className='fill-terciary w-6 h-6 stroke-3' />
				</button>
			</div>
		</div>
	) : (
		<button
			className='login-button'
			onClick={() => signIn('discord', { callbackUrl: '/dashboard' })}
		>
			Login com Discord
		</button>
	);
}
