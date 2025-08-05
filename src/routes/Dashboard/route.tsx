import {
	createFileRoute,
	Link,
	Outlet,
	// useRouteContext,
} from '@tanstack/react-router';
import D20Logo from '@/assets/D20.tsx';
// import ExitLogo from '@/assets/Exit.tsx';

export const Route = createFileRoute('/Dashboard')({
	component: RouteComponent,
});

function RouteComponent() {
	// const { id, avatar, username, logout } = useRouteContext({
	// 	from: '/Dashboard',
	// });

	// const avatarUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;

	return (
		<div className='flex h-full'>
			<aside className='bg-primary h-full p-5 w-52 flex flex-col items-center justify-between'>
				<D20Logo stroke='#31465e' className='bg-terciary p-2 rounded-full' />
				<nav className='flex flex-col items-center justify-evenly h-80'>
					<Link
						to='/Dashboard'
						className='bg-buttoncolor p-5 w-36 text-center rounded-2xl transition-all duration-100 hover:bg-terciary hover:text-primary'
						activeProps={{ className: 'bg-terciary text-primary' }}
					>
						Dashboard
					</Link>
					<Link
						to='/'
						className='bg-buttoncolor p-5 w-36 text-center rounded-2xl transition-all duration-100 hover:bg-terciary hover:text-primary'
					>
						Personagens
					</Link>
					<Link
						to='/'
						className='bg-buttoncolor p-5 w-36 text-center rounded-2xl transition-all duration-100 hover:bg-terciary hover:text-primary'
					>
						Campanhas
					</Link>
				</nav>
				{
					/* <div className='flex w-full justify-between'>
					<div className='flex flex-col items-center'>
						<img
							src={avatarUrl}
							alt='Imagem de usuário'
							className='size-12 rounded-full'
						/>
						<p>{username ? username : 'Teste'}</p>
					</div>
					<button
						onClick={logout}
						className='bg-fail cursor-pointer self-end p-3 rounded-md transition-all duration-200 hover:brightness-75'
					>
						<ExitLogo />
					</button>
				</div> */
				}
			</aside>
			<Outlet />
		</div>
	);
}
