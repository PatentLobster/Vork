'use strict';
/* global __static */
import {app, protocol, BrowserWindow, powerMonitor, Tray, Menu, Notification} from 'electron';
import {autoUpdater} from 'electron-updater';

const axios = require('axios');


// App logic
import db from "@/datastore";
import moment from "moment";
import path from "path";

const globalAny = global;
globalAny.db = db;
db.ensureIndex({fieldName: 'date', unique: true}, function (err) {
    // console.log(err);
});

function log_in() {
    let datetime = new Date();
    const t = moment(datetime);
    const today = t.format("YYYY-MM-DD");
    const now = t.format("HH:mm:ss");
    const doc = {
        "date": today,
        "clockIn": [now],
        "clockOut": []
    };

    db.update({"date": today}, {$push: {"clockIn": now}}, {}, function (err, result) {
        console.log(err, result);
        if (result === 0) {
            db.insert(doc);
        }
    });
}

function log_out() {
    let datetime = new Date();
    const t = moment(datetime);
    const today = t.format("YYYY-MM-DD");
    const now = t.format("HH:mm:ss");
    const doc = {
        "date": today,
        "clockIn": [],
        "clockOut": [now]
    };
    db.update({"date": today}, {$push: {"clockOut": now}}, {}, function (err, result) {
        // db.findOne({date: today}, function (err, doc) {
        console.log(err, result);
        if (result === 0) {
            db.insert(doc);
        }
    });
}

function greet() {
    axios.get("https://favqs.com/api/qotd").then((response) => {
        const quotes = response.data.quote.body;
        const author = response.data.quote.author;
        const arr = {'title': author, 'body': quotes, 'icon': path.join(__static, "/icon.png")};
        console.log(arr);
        return arr;
    }).then((arr) => callNotification(arr));
}

function callNotification(notif) {
    new Notification(notif).show();
}

// End of App logic.

import {
    createProtocol,
    installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let secWin;
let tray;

const createTray = () => {
    tray = new Tray(path.join(__static, "/icon.png"));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Open Developer tools", click() {
                if (win === null || win !== undefined) {
                    win.webContents.openDevTools();
                }
            }
        },
        {
            label: 'Exit', click() {
                app.quit()
            }
        }
    ]);
    tray.setToolTip("Vork is running");
    tray.setContextMenu(contextMenu);
    tray.on('click', function (event) {
        toggleWindow();
    })
};

const toggleWindow = () => {
    if (win === null) {
        createWindow()
    } else {
        if (win.isVisible()) {
            win.hide();
            win = null;
        } else {
            showWindow();
        }
    }
};
const showWindow = () => {
    // createWindow()
    win.loadFile('app://./index.html');
    const position = getWindowPosition();
    // win.reload();
    win.show();
    win.setPosition(position.x, position.y, true);
    console.log(win.getPosition())
};

const getWindowPosition = () => {
    const windowBounds = win.getBounds();
    const trayBounds = tray.getBounds();
    const x = Math.round(trayBounds.x - (windowBounds.width / 2.333));
    const y = trayBounds.y - windowBounds.height + 5;
    return {x: x, y: y}
};


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: {secure: true, standard: true}}]);

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 340,
        height: 300,
        show: true,
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        fullscreenable: false,
        skipTaskbar: true,
        icon: path.join(__static, 'icon.png'),
        webPreferences: {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
        }
    });
    const position = getWindowPosition();
    win.setPosition(position.x, position.y, true);
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        // if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        win.loadURL('app://./index.html');
        autoUpdater.checkForUpdatesAndNotify();
    }

    win.on('closed', () => {
        win = null
    });

    win.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        secWin = new BrowserWindow({
            width: 600,
            height: 600,
            show: true,
            frame: true,
            alwaysOnTop: false,
            transparent: false,
            fullscreenable: true,
            skipTaskbar: false,
            icon: path.join(__static, 'icon.png'),
            webPreferences: {
                nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
            }
        });
        if (process.env.WEBPACK_DEV_SERVER_URL) {
            // Load the url of the dev server if in development mode
            secWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL + "#/export");
            // if (!process.env.IS_TEST) win.webContents.openDevTools()
        } else {
            createProtocol('app');
            // Load the index.html when not in development
            secWin.loadURL('app://./index.html/#/export');
        }
    });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    powerMonitor.on('unlock-screen', () => {
        log_in();
        greet();
    });
    powerMonitor.on('lock-screen', () => {
        log_out();
    });


    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        // Devtools extensions are broken in Electron 6.0.0 and greater
        // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
        // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
        // If you are not using Windows 10 dark mode, you may uncomment these lines
        // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
        try {
            await installVueDevtools()
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }

    }
    log_in();
    createTray();
    createWindow();


});

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
