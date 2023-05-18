const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
})

contextBridge.exposeInMainWorld('shell', {
    openExternal: (url) => ipcRenderer.send('shell:openExternal', url),
})

contextBridge.exposeInMainWorld('modpacks', {
    onProgress: (callback) => ipcRenderer.on('progress', (event, message) => callback(message)),
    get: (url, filename) => ipcRenderer.invoke('modpacks:get', url, filename),
    delete: (id) => ipcRenderer.send('modpacks:delete', id),
})
