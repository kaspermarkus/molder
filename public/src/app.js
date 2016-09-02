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

