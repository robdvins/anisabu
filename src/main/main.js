'use strict'
import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'

import * as SubtitleInfoChannel from './ipc/subtitleInfoChannel'
import * as DownloadDirChannel from './ipc/downloadDirChannel'
import * as SaveSubtitleChannel from './ipc/saveSubtitleChannel'

const isDevelopment = process.env.NODE_ENV !== 'production'

let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 700,
    resizable: false,
    title: 'Anisabu',
    icon: path.join(__dirname, 'icons/win/icon.ico'),
    webPreferences: {
      nodeIntegration: true,
    },
  })

  if (!isDevelopment) win.setMenu(null)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('ready', () => {
  ipcMain.handle(SubtitleInfoChannel.name(), (e, args) =>
    SubtitleInfoChannel.handle(e, args)
  )
  ipcMain.on(DownloadDirChannel.name(), (e, args) =>
    DownloadDirChannel.handle(e, args)
  )
  ipcMain.handle(SaveSubtitleChannel.name(), (e, args) =>
    SaveSubtitleChannel.handle(e, args)
  )
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
