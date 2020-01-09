const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron')
const isDev = require('electron-is-dev')

app.on('ready', () => {
    require('devtron').install()
    let mainWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadFile('index.html')
    mainWindow.webContents.openDevTools()
    ipcMain.on('message', (event, data) => {
        console.log(data)
        event.reply('reply', 'hello from main')
    })

    // let secondWindow = new BrowserWindow({
    //     width: 400,
    //     height: 300,
    //     webPreferences: {
    //         nodeIntegration: true
    //     },
    //     parent: mainWindow
    // })
    // secondWindow.loadFile('second.html')
})