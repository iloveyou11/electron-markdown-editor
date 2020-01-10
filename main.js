const {
    app,
    BrowserWindow
} = require('electron')
const isDev = require('electron-is-dev')

app.on('ready', () => {
    // require('devtron').install()
    let mainWindow = new BrowserWindow({
        width: 1600,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })
    const urlLocation = isDev ? 'http://localhost:3000' : 'falseUrl'
    mainWindow.loadURL(urlLocation)
})