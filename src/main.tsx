import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import './App.css';

// Import the generated route tree
import { routeTree } from './routeTree.gen.ts';
import { createHashHistory } from '@tanstack/react-router';

// Create a new router instance
const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
	scrollRestoration: true,
	history: createHashHistory(),
	context: {
		id: null,
		avatar: null,
		username: null,
		global_name: null,
		login: () => {},
		logout: () => {},
	},
});

function App() {
	const [session, setSession] = useState<
		Omit<SessionContext, 'login' | 'logout'>
	>({
		id: null,
		avatar: null,
		username: null,
		global_name: null,
	});

	const login = (user: Partial<Omit<SessionContext, 'login' | 'logout'>>) => {
		setSession((prev) => ({ ...prev, ...user }));
	};

	const logout = () => {
		setSession({
			id: null,
			avatar: null,
			username: null,
			global_name: null,
		});
		router.navigate({ to: '/' });
	};

	const router = createRouter({
		routeTree,
		defaultPreload: 'intent',
		scrollRestoration: true,
		history: createHashHistory(),
		context: {
			...session,
			login,
			logout,
		},
	});

	useEffect(() => {
		router.update({
			context: {
				...session,
				login,
				logout,
			},
		});
	}, [session, login, logout]);

	return <RouterProvider router={router} />;
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
