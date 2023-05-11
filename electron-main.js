const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        minWidth: 1024,
        width: 1024,
        minHeight: 668,
        height: 668,
        icon: path.join(__dirname, './public/favicon.ico'),
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'electron-preloader.js')
        },
    })

    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
    mainWindow.setMenuBarVisibility(false)

    if (process.env.NODE_ENV === 'development') mainWindow.loadURL('http://localhost:45678/')
    else mainWindow.loadFile(path.join(__dirname, './dist/index.html'))
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
})

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })



ipcMain.on('open-external', (event, url) => require('electron').shell.openExternal(url))
