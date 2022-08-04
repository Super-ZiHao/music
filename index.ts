// 用于控制应用程序寿命和创建本机浏览器窗口的模块
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
// 获取在 package.json 中命令脚本传入的参数，来判断是开发还是生产环境
const mode = process.argv[2]

let mainWindow
function createWindow() {
  // 创建浏览器窗口。
  mainWindow = new BrowserWindow({
    width: 900,
    minWidth: 900,
    maxWidth: 900,
    height: 600,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    transparent: true,
    frame: false
  })
  // mainWindow.webContents.openDevTools() // 控制台
  if (mode === 'dev') {
    mainWindow.loadURL('http://localhost:4000/')
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, './dist/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }
}

// 当电子完成时，将调用此方法
// 初始化并准备创建浏览器窗口。
// 某些API只能在该事件发生后使用。
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    // 在macOS上，在应用程序中重新创建窗口是很常见的
    // 单击dock图标，没有其他窗口打开。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  ipcMain.on('min', e => mainWindow.minimize()) // 最小化
  ipcMain.on('onToggleMax', e => (mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize())) // 切换最大化
  ipcMain.on('close', e => mainWindow.destroy() && (mainWindow = null)) // 关闭
})

// 当所有窗口（macOS上除外）关闭时退出。这很常见
// 让应用程序及其菜单栏保持活动状态，直到用户退出
// 使用Cmd+Q显式。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
