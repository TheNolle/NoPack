const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
})

contextBridge.exposeInMainWorld('modpacks', {
    getAll: () => ipcRenderer.send('modpacks-getAll'),
})

contextBridge.exposeInMainWorld('shell', {
    openExternal: (url) => ipcRenderer.send('shell-openExternal', url),
})
