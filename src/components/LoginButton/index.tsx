'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export function AuthButton() {
	const { data: session } = useSession();

	return session ? (
		<div>
			<Image
				src={session.user.image!}
				alt='Avatar'
				width={40}
				height={40}
				className='rounded-full'
			/>
			<p>Olá, {session.user?.name}!</p>
			<button
				className='login-button'
				onClick={() => signOut()}
			>
				Sair
			</button>
		</div>
	) : (
		<button
			className='login-button'
			onClick={() => signIn('discord')}
		>
			Login com Discord
		</button>
	);
}
