// import { ipcRenderer } from 'electron'
const { ipcRenderer } = require('electron')

export const handleMinWin = () => ipcRenderer.send('min') // 最小化
export const handleMaxWin = () => ipcRenderer.send('max') // 最大化
export const handleUnMaxWin = () => ipcRenderer.send('unMax') // 取消最大化
export const handleCloseWin = () => ipcRenderer.send('close') // 关闭
