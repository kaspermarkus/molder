requirejs.config({
  baseUrl: '/lib',
  paths: {
    app: '../src',
    globals: '../src/globals',
    session: '../src/Session',
    'bootstrap': '../lib/bootstrap/js/bootstrap',
    'jsPlumb': '../lib/jsPlumb'
  },
  shim: {
    'bootstrap': ['jquery', 'jquery-ui']
  }
});

define(['backbone', 'globals', 'session', 'jsplumb', 'app/nodeListing/NodeListingView', 'jquery-ui'], function(Backbone, Globals, Session, jsplumb, NodeListingView) {
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
      // var login = this.views.login;

      // if(login) {
      //   login.initialize();
      //   this.content.append(login.el);
      //   $('input').first().focus();
      // } else {
        this.nodeListing = new NodeListingView();

      //   this.content.append(this.views.login.el);

      //   $('input').first().focus();
      // }
    }


  });

  window.App = new App();

  Backbone.history.start({ pushState: true });
});
