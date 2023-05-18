const { app, BrowserWindow, ipcMain, shell, protocol } = require('electron')
const path = require('path')
const fs = require('fs')
const axios = require('axios')
const AdmZip = require('adm-zip')
const { v4: uuidv4 } = require('uuid')

const appdata = app.getPath('appData')
const roaming = path.join(appdata, 'nopack')
if (!fs.existsSync(roaming)) fs.mkdirSync(roaming)
const locallow = path.join(path.join(appdata, '..'), 'LocalLow', 'nopack')
if (!fs.existsSync(locallow)) fs.mkdirSync(locallow)
const temp = path.join(app.getPath('temp'), 'nopack')
if (!fs.existsSync(temp)) fs.mkdirSync(temp)

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
            webSecurity: false,
            contextIsolation: true,
            devTools: true,
            preload: path.join(__dirname, 'electron-preloader.js')
        },
    })

    mainWindow.setMenuBarVisibility(false)
    // mainWindow.setMenu(null)

    process.env.NODE_ENV === 'development' ? mainWindow.loadURL('http://localhost:45678/') : mainWindow.loadFile(path.join(__dirname, './dist/index.html'))
    protocol.registerFileProtocol('file', (request, callback) => callback(decodeURI(request.url.replace('file:///', ''))))
    app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')

    app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
}

app.on('ready', () => createWindow())
app.on('window-all-closed', () => process.platform !== 'darwin' ? app.quit() : null)



ipcMain.on('shell:openExternal', (event, url) => shell.openExternal(url))

ipcMain.handle('modpacks:get', async (event, url, filename) => {
    const dir = path.join(temp, uuidv4())
    event.sender.send('progress', 'Creating directory: ' + dir)
    fs.mkdirSync(dir)
    const writer = fs.createWriteStream(path.join(dir, filename))
    try {
        if (isLocalFile(url)) {
            event.sender.send('progress', 'Copying from local file: ' + url)
            fs.copyFileSync(url, path.join(dir, filename))
        } else {
            event.sender.send('progress', 'Starting download from URL: ' + url)
            const response = await axios({ url, method: 'GET', responseType: 'stream' })
            event.sender.send('progress', 'Received response: ' + JSON.stringify(response.headers))
            response.data.pipe(writer)
        }
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve)
            writer.on('error', reject)
        }).then(() => {
            event.sender.send('progress', 'File is ready. Unzipping...')
            const zip = new AdmZip(path.join(dir, filename))
            zip.extractAllTo(dir, true)
            event.sender.send('progress', 'Unzip completed.')
        })
    } catch (error) {
    }
    function isLocalFile(url) {
        return url.startsWith('file://')
    }
})
ipcMain.on('modpacks:delete', (event, id) => {
    const modpacks = JSON.parse(fs.readFileSync('./src/static/temp/modpacks.json'))
    const modpack = modpacks.find(modpack => modpack.id === id)
    if (modpack) {
        modpacks.splice(modpacks.indexOf(modpack), 1)
        fs.writeFileSync('./src/static/temp/modpacks.json', JSON.stringify(modpacks, null, 4))
    }
})
