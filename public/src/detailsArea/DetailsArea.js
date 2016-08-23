define(['backbone', 'session', 'jsplumb', "app/detailsArea/NodeEditor", "jquery-ui"], function (Backbone, Session, jsplumb, NodeEditor) {
  'use strict';

  /*
  * View for setting up the objective function and the budget.
  */
  var DetailsArea = Backbone.View.extend({
    session: null,
    nodeEditor: null,

    initialize: function (options) {
        this.session = options.session;
    },

    showNodeEditorView: function (id, node) {
        var proto = this.session.getNodePrototype(node.type);

        if (this.nodeEditor !== null) {
            this.nodeEditor.destroy();
            // TODO unbind, etc. move to destroy function
        }

        this.nodeEditor = new NodeEditor({
            id: id,
            node: node,
            proto: proto,
            el: "#editorPane",
            session: this.session
        });

        this.showTab("editorPane");
    },

    showTab: function (tabName) {
      $('#detailsAreaTabs a[href="#' + tabName + '"]').tab('show');
    }
  });

  return DetailsArea;
});