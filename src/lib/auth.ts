import { NextAuthOptions, getServerSession } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

const { CLIENT_ID, CLIENT_TOKEN, NEXTAUTH_SECRET } = process.env;

const scopes = ['identify'].join(' ');

export const authOptions: NextAuthOptions = {
	providers: [
		DiscordProvider({
			clientId: CLIENT_ID as string,
			clientSecret: CLIENT_TOKEN as string,
			authorization: { params: { scope: scopes } },
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (token) {
				session.user.id = token.sub!;
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.sub = user.id;
			}
			return token;
		},
	},
	secret: NEXTAUTH_SECRET as string,
};

export const getAuthSession = async () => {
	return await getServerSession(authOptions);
};
