import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { invoke } from '@tauri-apps/api/core';

function App() {
	const [greetMsg, setGreetMsg] = useState('');
	const [name, setName] = useState('');

	async function greet() {
		setGreetMsg(await invoke('greet', { name }));
	}

	return (
		<main className='container mx-auto p-8 max-w-4xl'>
			<h1 className='text-4xl font-bold text-center mb-8 text-gray-800'>
				Welcome to Tauri + React
			</h1>

			<div className='flex justify-center gap-8 mb-8'>
				<a
					href='https://vitejs.dev'
					target='_blank'
					className='hover:opacity-80 transition-opacity'
				>
					<img src='/vite.svg' className='w-16 h-16' alt='Vite logo' />
				</a>
				<a
					href='https://tauri.app'
					target='_blank'
					className='hover:opacity-80 transition-opacity'
				>
					<img src='/tauri.svg' className='w-16 h-16' alt='Tauri logo' />
				</a>
				<a
					href='https://reactjs.org'
					target='_blank'
					className='hover:opacity-80 transition-opacity'
				>
					<img
						src={reactLogo}
						className='w-16 h-16 animate-spin'
						alt='React logo'
					/>
				</a>
			</div>

			<p className='text-center mb-8 text-gray-600'>
				Click on the Tauri, Vite, and React logos to learn more.
			</p>

			<form
				className='flex gap-4 justify-center mb-4'
				onSubmit={(e) => {
					e.preventDefault();
					greet();
				}}
			>
				<input
					id='greet-input'
					onChange={(e) => setName(e.currentTarget.value)}
					placeholder='Enter a name...'
					className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
				<button
					type='submit'
					className='px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
				>
					Greet
				</button>
			</form>

			{greetMsg && (
				<p className='text-center text-lg font-semibold text-green-600'>
					{greetMsg}
				</p>
			)}
		</main>
	);
}

export default App;
