define(['backbone', 'session', 'globals', 'jsplumb', "jquery-ui"], function (Backbone, Session, Globals, jsPlumb) {
  'use strict';

  /*
  * View for setting up the objective function and the budget.
  */
  var MainGraph = Backbone.View.extend({
    session: null,
    nodes: {},
    el: "#graphArea",

    initialize: function (options) {
        this.session = options.session;
        var that = this;

        jsPlumb.ready(function () {
          jsPlumb.bind("connection", function (info) {
            that.session.addConnection(info.sourceId, info.targetId);
            info.connection.bind("click", function (con) {
              that.session.trigger("connectionSelected", con);
            });
           });

          jsPlumb.bind("connectionDetached", function (info) {
            that.session.removeConnection(info.sourceId, info.targetId);
            that.unselectConnections();
            info.connection.unbind("click");
          });

          // jsPlumb.bind(click(connection, originalEvent)
        });
    },

    unselectNodes: function () {
        this.$el.find(".node").removeClass("selected");
    },

    selectNode: function (nodeId) {
        this.$el.find("#" + nodeId).addClass("selected");
    },

    selectConnection: function (con) {
      con.canvas.classList.add("selectedConnection");
      for (var index in con.endpoints) {
        con.endpoints[index].addClass("selectedConnection");
      }
    },

    unselectConnections: function () {
      $("#graphArea div.selectedConnection").removeClass("selectedConnection"); // endpoints
      if ($("#graphArea svg.selectedConnection").length > 0) {
        $("#graphArea svg.selectedConnection")[0].classList.remove("selectedConnection");
      }
    },

    updateStatus: function () {
      this.$el.find(".node .statusIcon").hide();
      var index, nodeView;

      for (index in this.session.errors) {
        var err = this.session.errors[index];
        nodeView = this.session.nodeViews[err.node];
        nodeView.showError(err);
        // console.log("ID " + id);
        // var node = this.session.nodeViews[id];
      }

      for (index in this.session.warnings) {
        var warning = this.session.warnings[index];
        nodeView = this.session.nodeViews[warning.node];
        nodeView.showWarning(warning);
        // console.log("ID " + id);
        // var node = this.session.nodeViews[id];
      }
    }


  });

  return MainGraph;
});