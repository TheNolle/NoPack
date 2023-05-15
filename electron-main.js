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



ipcMain.on('shell-openExternal', (event, url) => require('electron').shell.openExternal(url))
ipcMain.on('modpacks-getAll', async () => { return modpacks })

const modpacks = [
    {
        name: 'SkyFactory 4',
        description: 'Offering a brand-new experience never before seen in the series. Full automation, tech, magic, and bacon resources! This iteration offers over 30+ world types so you can play the pack like never before! While some world types are based on the classic tree on dirt others are designed with unique recipes and advancements.',
        version: '4.1.0',
        loader: 'Forge',
        icon: 'https://media.forgecdn.net/avatars/199/573/636907930795697123.png'
    },
    {
        name: 'Continuum',
        description: 'Introducing new, never before used mods to make things even more difficult and challenging. The overall goal of this pack is to extend game play buy making large changes to progression though out the mods. The overall goal of this pack is to extend game play buy making large changes to progression though out the mods.',
        version: '1.3.0',
        loader: 'Forge',
        icon: 'https://media.forgecdn.net/avatars/153/547/636619228771834618.png'
    },
    {
        name: 'Omnifactory',
        description: 'An extremely tech focused expert pack centered around Gregtech Community Edition. After around 5 months of development, it is finally time to release it to the public.',
        version: '1.2.0',
        loader: 'Forge',
        icon: 'https://media.forgecdn.net/avatars/198/486/636900272840730252.jpeg'
    },
    {
        name: 'Enigmatica 2: Expert',
        description: 'An expert questing modpack for Minecraft 1.12 with over 650 quests to guide you along the way.',
        version: '1.75',
        loader: 'Forge',
        icon: 'https://media.forgecdn.net/avatars/287/344/637307898262282482.jpeg'
    }
]