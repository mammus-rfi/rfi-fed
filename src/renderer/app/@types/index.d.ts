interface SessionContext {
	id: string | null
	avatar: string | null
	username: string | null
	global_name: string | null
	login: (user: Partial<Omit<SessionContext, 'login' | 'logout'>>) => void;
	logout: () => void;
}