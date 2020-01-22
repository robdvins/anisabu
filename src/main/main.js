'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

class Main {
  constructor() {
    this.isDevelopment = process.env.NODE_ENV !== 'production'
    this.mainWindow = null
    // Scheme must be registered before the app is ready
    protocol.registerSchemesAsPrivileged([
      { scheme: 'app', privileges: { secure: true, standard: true } },
    ])
  }

  init() {
    app.on('window-all-closed', this.windowAllClosed)
    app.on('activate', this.activate)
    app.on('ready', this.createWindow)

    // Exit cleanly on request from parent process in development mode.
    if (this.isDevelopment) {
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
  }

  createWindow() {
    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      title: 'Anisabu',
      webPreferences: {
        nodeIntegration: true,
      },
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      this.mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
      if (!process.env.IS_TEST) this.mainWindow.webContents.openDevTools()
    } else {
      createProtocol('app')
      this.mainWindow.loadURL('app://./index.html')
    }

    this.mainWindow.on('closed', () => {
      this.mainWindow = null
    })
  }

  windowAllClosed() {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  }

  activate() {
    if (this.mainWindow === null) {
      this.createWindow()
    }
  }
}

new Main().init()
