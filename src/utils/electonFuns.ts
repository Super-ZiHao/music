// import { ipcRenderer } from 'electron'
const { ipcRenderer } = require('electron')

export const handleMinWin = () => ipcRenderer.send('min') // 最小化
export const handleChangeMaxWin = () => ipcRenderer.send('onToggleMax') // 切换最大化
export const handleCloseWin = () => ipcRenderer.send('close') // 关闭
