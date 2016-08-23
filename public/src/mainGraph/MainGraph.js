define(['backbone', 'session', 'jsplumb', "jquery-ui"], function (Backbone, Session, jsplumb) {
  'use strict';

  /*
  * View for setting up the objective function and the budget.
  */
  var MainGraph = Backbone.View.extend({
    session: null,

    initialize: function (options) {
        this.session = options.session;
    },

    unselectNodes: function () {
        $("#graphArea .node").removeClass("selected");
    },

    selectNode: function (nodeId) {
        $("#graphArea #" + nodeId).addClass("selected");
    }
  });

  return MainGraph;
});