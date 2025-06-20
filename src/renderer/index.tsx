/* eslint-disable @typescript-eslint/no-empty-function */
import { StrictMode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashHistory, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// Create a new router instance

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
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
})

 function App() {
  const [session, setSession] = useState<Omit<SessionContext, 'login' | 'logout'>>({
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
  };

  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
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
				logout
			}
    });
  }, [session, login, logout]);

  return <RouterProvider router={router} />;
}

// Register the router instance for type safety
	declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const root = ReactDOM.createRoot(document.body)
root.render(
	<StrictMode>
		<App />
	</StrictMode>,
)