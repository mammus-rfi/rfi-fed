import { createFileRoute } from '@tanstack/react-router';
import D20Logo from '@/assets/D20.tsx';
import { useDiscordAuth } from '@/hooks/useDiscordAuth.ts';

export const Route = createFileRoute('/')({
	component: Index,
});

function Index() {
	const { user, isLoading, error, startAuth, logout } = useDiscordAuth();

	const handleLogin = async () => {
		await startAuth();
	};

	if (user) {
		return (
			<div className='h-full flex items-center justify-center'>
				<div className='bg-primary size-96 p-2 flex flex-col justify-evenly items-center rounded-4xl'>
					<div className='flex items-center gap-4 text-center'>
						{user.avatar && (
							<img
								src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
								alt='Avatar'
								className='w-16 h-16 rounded-full'
							/>
						)}
						<div className='text-terciary'>
							<h2 className='text-xl font-bold'>
								{user.global_name || user.username}
							</h2>
							<p className='text-sm opacity-75'>@{user.username}</p>
						</div>
					</div>
					<button
						type='button'
						className='bg-buttoncolor text-terciary rounded-3xl w-64 h-20 font-extrabold text-xl cursor-pointer hover:bg-secondary transition-all duration-75'
						onClick={logout}
					>
						Logout
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='h-full flex items-center justify-center'>
			<div className='bg-primary size-96 p-2 flex flex-col justify-evenly items-center rounded-4xl'>
				<D20Logo />
				<h1 className='font-extrabold text-2xl text-terciary'>
					ROLL FOR INITIATIVE
				</h1>

				{error && (
					<div className='text-fail text-center'>
						<p>Erro na autenticação:</p>
						<p className='text-sm'>{error}</p>
					</div>
				)}

				<button
					type='button'
					className='bg-buttoncolor text-terciary rounded-3xl w-64 h-20 font-extrabold text-xl cursor-pointer hover:bg-secondary transition-all duration-75 disabled:opacity-50'
					onClick={handleLogin}
					disabled={isLoading}
				>
					{isLoading ? 'Autenticando...' : 'Login com Discord'}
				</button>
			</div>
		</div>
	);
}
