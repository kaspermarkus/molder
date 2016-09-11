
const {remote} = require('electron')
const {Menu, MenuItem} = remote

requirejs.config({
  baseUrl: 'lib',
  paths: {
    app: '../src',
    globals: '../src/globals',
    session: '../src/Session',
    'bootstrap': '../lib/bootstrap/js/bootstrap',
    'bootstrap-select': '../lib/bootstrap-select',
    'jsPlumb': '../lib/jsPlumb'
  },
  shim: {
    'bootstrap': ['jquery', 'jquery-ui'],
    'jquery-sortable-min': ['jquery']
  }
});

define(['backbone', 'globals', 'session', 'jsplumb', 'app/nodeListing/NodeListingView', 'jquery', 'jquery-ui', 'jquery-sortable-min', 'bootstrap'],
  function(Backbone, Globals, Session, jsplumb, NodeListingView) {
  'use strict';

  var App = Backbone.Router.extend({
    views: {
      login: null,
      dashboard: null,
      dataset: null,
      menu: null
    },

    ids: {
      datasetId: null,
      configurationId: null
    },

    content: $('#content'),

    routes: {
      '': 'init',
    },

    makeDraggable: function (jsPlumb, elementId) {
      jsPlumb.draggable(elementId, {
        containment: true
      });
    },

    init: function () {
      this.initNodeMetadata();
      jsplumb.ready(_.bind(function() {
        console.log("Initializing jsPlumb");
        jsPlumb.setContainer($("#graphArea"));
      }, this));
      Globals.tryMold(Session.currentSession());

      var template = [
        {
          label: 'File',
          submenu: [
            {
              label: "Save mold",
              role: 'save'
            },
            {
              label: "Load mold",
              role: 'load'
            },
            {
              label: "Undo TBD",
              role: 'undo'
            },
            {
              label: "Redo TBD",
              role: 'redo'
            },
            {
              type: 'separator'
            },
            {
              label: "Cut TBD",
              role: 'cut'
            },
            {
              label: "Copy TBD",
              role: 'copy'
            },
            {
              label: "Paste TBD",
              role: 'paste'
            }
          ]
        }, {
          label: 'View',
          submenu: [
            {
              label: 'Reload',
              accelerator: 'CmdOrCtrl+R',
              click (item, focusedWindow) {
                if (focusedWindow) focusedWindow.reload()
              }
            },
            {
              label: 'Toggle Developer Tools',
              accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
              click (item, focusedWindow) {
                if (focusedWindow) focusedWindow.webContents.toggleDevTools()
              }
            },
            {
              type: 'separator'
            },
            {
              role: 'resetzoom'
            },
            {
              role: 'zoomin'
            },
            {
              role: 'zoomout'
            },
            {
              type: 'separator'
            },
            {
              role: 'togglefullscreen'
            }
          ]
        },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('http://electron.atom.io') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  const name = require('electron').remote.app.getName()
  template.unshift({
    label: name,
    submenu: [
      {
        label: "KASPER",
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  })
  // Edit menu.
  template[1].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Speech',
      submenu: [
        {
          role: 'startspeaking'
        },
        {
          role: 'stopspeaking'
        }
      ]
    }
  )
  // Window menu.
  template[3].submenu = [
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    },
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      label: 'Zoom',
      role: 'zoom'
    },
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  ]
}

var menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
    },

    initNodeMetadata: function () {
      var that = this;
      // Retrieve data:
      $.ajax({
        type: "GET",
        url: Globals.backend + "/node-metadata",
        async: false, // TODO: Make async
        success : function(metadata) {
            $.ajax({
              dataType: "json",
              url: "src/nodeUIMetadata.json",
              success: function (uiMetadata) {
                for (var id in metadata) {
                  metadata[id].ui = uiMetadata.nodes[id];
                }
                Session.currentSession().nodePrototypes = metadata;
                Session.currentSession().nodeCategorization = uiMetadata.categories;
                console.log("Done initializing metadata");
                that.initNodeListing();
              },
              error: function (err) {
                window.alert("891238123: TODO proper error here" + JSON.stringify(err));
              }
            });
            // window.alert(JSON.stringify(data));
        },
        error: function (err) {
            window.alert("Error retrieving node metadata from backend...\nTODO: Proper error handling here!");
        }
      });
    },

    events: _.extend({}, Backbone.Events),

    initNodeListing: function() {
        this.nodeListing = new NodeListingView();
    }






  });

  window.App = new App();
  window.App.init();

  Backbone.history.start({ pushState: true });
});

