const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
    const mainWindow = new BrowserWindow({
        title: 'NoPack',
        icon: path.join(__dirname, './public/favicon.ico'),
        center: true,
        darkTheme: true,
        minWidth: 1024,
        width: 1024,
        minHeight: 600,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            contextIsolation: true,
            devTools: true,
            preload: path.join(__dirname, 'electron-preloader.js')
        },
    })

    mainWindow.setMenuBarVisibility(false)

    process.env.NODE_ENV === 'development' ? mainWindow.loadURL('http://localhost:45678/') : mainWindow.loadFile(path.join(__dirname, './dist/index.html'))

    app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
}

app.on('ready', () => createWindow())
app.on('window-all-closed', () => process.platform !== 'darwin' ? app.quit() : null)



ipcMain.on('shell:openExternal', (event, url) => require('electron').shell.openExternal(url))