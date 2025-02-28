'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { IoMdExit } from 'react-icons/io';
import Image from 'next/image';

export function AuthButton() {
	const { data: session } = useSession();

	return session ? (
		<div className='flex flex-col w-40'>
			<p className='font-semibold text-xl leading-6 mb-2.5'>
				Olá, <br />
				{session.user?.name}!
			</p>
			<div className='flex justify-between'>
				<Image
					src={session.user.image!}
					alt='Avatar'
					width={50}
					height={50}
					className='rounded-full border-4 border-terciary'
				/>
				<button
					className='bg-error rounded-xl w-10 h-10 flex justify-center items-center self-end cursor-pointer transition-all duration-200 hover:bg-[#c93b56]'
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
