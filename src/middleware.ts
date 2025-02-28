import { withAuth } from 'next-auth/middleware';

// Protegendo rotas específicas
export default withAuth({
	pages: {
		// Redireciona usuários não autenticados para a página de login
		signIn: '/',
	},
});

// Define quais rotas devem ser protegidas
export const config = {
	// Protege todas as rotas dentro de "/dashboard"
	matcher: ['/dashboard/:path*'],
};
