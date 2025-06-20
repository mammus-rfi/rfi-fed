// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electron', {
	openDiscordLogin: () => ipcRenderer.send('open-discord-login'),
	onDiscordOAuthCode: (callback: (code: string) => void) => {
    ipcRenderer.on('discord-oauth-code', (_event, code) => callback(code));
  }
})