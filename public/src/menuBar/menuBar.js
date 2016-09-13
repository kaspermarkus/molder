
const {remote} = require('electron')
const {Menu, MenuItem} = remote

define(['backbone', 'globals', 'session'],
    function(Backbone, Globals, Session) {
    'use strict';

    var MenuBar = function () {
        var that = this;

        this.template = [
            {
                label: 'File',
                submenu: [
                    {
                        label: "Save Mold",
                        accelerator: process.platform === 'darwin' ? 'Command+S' : 'Ctrl+S',
                        click: function () {
                            that.saveMold();
                        }
                    }, {
                        label: "Save Mold As...",
                        accelerator: process.platform === 'darwin' ? 'Shift+Command+S' : 'Shift+Ctrl+S',
                        click: function () {
                            that.saveMoldAs();
                        }
                    }, {
                        label: "Load Mold",
                        accelerator: process.platform === 'darwin' ? 'Command+O' : 'Ctrl+O',
                        click: function () {
                            that.loadMold();
                        }
                    }
                ]
            }, {
                label: 'Edit',
                submenu: [
                  {
                    role: 'cut'
                  },
                  {
                    role: 'copy'
                  },
                  {
                    role: 'paste'
                  },
                  {
                    role: 'pasteandmatchstyle'
                  },
                  {
                    role: 'selectall'
                  }
                ]
            }, {
                label: 'Dev',
                submenu: [
                    {
                        label: 'Reload',
                        accelerator: 'CmdOrCtrl+R',
                        click (item, focusedWindow) {
                            if (focusedWindow) focusedWindow.reload();
                        }
                    }, {
                        label: 'Toggle Developer Tools',
                        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                        click (item, focusedWindow) {
                            if (focusedWindow) focusedWindow.webContents.toggleDevTools();
                        }
                    }
                ]
            }
        ];

        this.initialize = function (options) {
            this.session = options.session;
            var menu = Menu.buildFromTemplate(this.template);
            Menu.setApplicationMenu(menu);
        };

        this.saveMold = function () {
            // if we dont have a save/file with the current mold:
            if (!this.session.currentMoldFile) {
                this.saveMoldAs();
            } else {
                this.session.saveMold();
            }
        };

        this.saveMoldAs = function () {
            var tmp = dialog.showSaveDialog({
              title: "Save current mold as.."
            });
            if (tmp) {
                this.session.saveMold(tmp);
            }
        };

        this.loadMold = function () {
            var tmp = dialog.showOpenDialog({
              properties: ['openFile'],
              title: "Open mold"
            });
            if (tmp && tmp[0]) {
                this.session.loadMold(tmp[0]);
            }
            // window.alert("Hello world");
        };

        return this;

  };

  return MenuBar;
});

