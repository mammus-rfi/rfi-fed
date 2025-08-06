import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { useCallback, useEffect, useState } from 'react';

export interface DiscordUser {
	id: string;
	username: string;
	discriminator: string;
	avatar: string | null;
	global_name: string | null;
	email?: string;
}

export function useDiscordAuth() {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState<DiscordUser | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Escutar eventos de autenticação
		const setupListeners = async () => {
			const unlisten = await listen<string>(
				'discord-oauth-code',
				async (event) => {
					try {
						console.log('Token recebido:', event.payload);

						const token = event.payload;

						// Fazer request para a API do Discord
						const response = await fetch('https://discord.com/api/users/@me', {
							headers: {
								'Authorization': token,
							},
						});

						if (response.ok) {
							const userData: DiscordUser = await response.json();
							console.log('Dados do usuário:', userData);
							setUser(userData);
							setError(null);
						} else {
							const errorText = await response.text();
							console.error('Erro da API do Discord:', errorText);
							setError('Erro ao obter dados do usuário');
						}
					} catch (err) {
						console.error('Erro no processamento:', err);
						setError(err instanceof Error ? err.message : 'Erro desconhecido');
					} finally {
						setIsLoading(false);
					}
				},
			);

			return unlisten;
		};

		setupListeners();
	}, []);

	const startAuth = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);

			console.log('Iniciando autenticação...');

			// Abrir janela de autenticação
			await invoke('open_discord_auth');

			console.log('Janela de autenticação aberta');
		} catch (err) {
			console.error('Erro ao abrir autenticação:', err);
			setError(
				err instanceof Error
					? err.message
					: 'Erro ao abrir janela de autenticação',
			);
			setIsLoading(false);
		}
	}, []);

	const logout = useCallback(async () => {
		setUser(null);
		setError(null);

		// Opcional: fechar janela de autenticação se estiver aberta
		try {
			await invoke('close_auth_window');
		} catch (err) {
			// Ignorar erro se a janela não existir
			console.log('Janela de autenticação já estava fechada');
		}
	}, []);

	return {
		user,
		isLoading,
		error,
		startAuth,
		logout,
	};
}
