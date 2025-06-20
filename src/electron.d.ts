export {};

declare global {
  interface Window {
    electron: {
      openDiscordLogin: () => void;
      onDiscordOAuthCode: (callback: (code: string) => void) => void;
    };
  }
}