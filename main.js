const {
    app,
    BrowserWindow
} = require('electron')
const isDev = require('electron-is-dev')

app.on('ready', () => {
    // require('devtron').install()
    let mainWindow = new BrowserWindow({
        width: 1024,
        height: 680,
        webPreferences: {
            nodeIntegration: true
        }
    })
    const urlLocation = isDev ? 'http://localhost:3000' : 'falseUrl'
    mainWindow.loadURL(urlLocation)
})