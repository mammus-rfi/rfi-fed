import { createFileRoute } from '@tanstack/react-router';
// import { useEffect } from 'react'
// import axios from 'axios'
import D20Logo from '@/assets/D20.tsx';

export const Route = createFileRoute('/')({
	component: Index,
});

function Index() {
	// const { login } = useRouteContext({ from: '/' })
	// const router = useRouter()

	// function handleLogin() {
	//   window.electron.openDiscordLogin()
	// }

	// useEffect(() => {
	//   window.electron.onDiscordOAuthCode((code: string) => {
	//     axios.get<SessionContext>('https://discord.com/api/users/@me', {
	//       headers: {
	//         Authorization: code
	//       }
	//     }).then((results) => {
	//       login({
	//         avatar: results.data.avatar,
	//         global_name: results.data.global_name,
	//         id: results.data.id,
	//         username: results.data.username
	//       });
	//       router.navigate({ to: '/Dashboard' });
	//     })
	//   });
	// }, []);

	return (
		<div className='h-full flex items-center justify-center'>
			<div className='bg-primary size-96 p-2 flex flex-col justify-evenly items-center rounded-4xl'>
				<D20Logo />
				<h1 className='font-extrabold text-2xl'>ROLL FOR INITIATIVE</h1>
				{
					/* <button className='bg-buttoncolor rounded-3xl w-64 h-20 font-extrabold text-xl cursor-pointer hover:bg-secondary transition-all duration-75' onClick={handleLogin}>Login</button>
        <button className='underline cursor-pointer'>Cadastre-se</button> */
				}
			</div>
		</div>
	);
}
