import {ipcRenderer as ipc} from 'electron';

export const ipcRenderer = {send: ipc.send} as const;
