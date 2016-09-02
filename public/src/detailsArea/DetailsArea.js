define(['backbone', 'session', 'globals', 'jsplumb', "app/nodeEditor/NodeEditor", "app/detailsArea/SampleDataView", "app/detailsArea/ErrorMessagesView", "jquery-ui"],
  function (Backbone, Session, Globals, jsplumb, NodeEditor, SampleDataView, ErrorMessagesView) {
  'use strict';

  /*
  * View for setting up the objective function and the budget.
  */
  var DetailsArea = Backbone.View.extend({
    session: null,
    nodeEditor: null,
    inputSampleView: null,
    outputSampleView: null,
    connectionSampleView: null,
    errorMessagesView: null,
    el: "#detailsArea",

    initialize: function (options) {
        _.bindAll(this, 'nodeSelected', 'connectionSelected', 'errorSelected');
        this.session = options.session;
        this.inputSampleView = new SampleDataView({
            el: "#inputSamplePane",
        });
        this.outputSampleView = new SampleDataView({
            el: "#outputSamplePane",
        });
        this.connectionSampleView = new SampleDataView({
            el: "#connectionSamplePane",
        });
        this.errorMessagesView = new ErrorMessagesView({
            el: "#errorMessagesPane",
            session: this.session
        });

        this.nothingSelected();
    },

    updateStatus: function () {
        this.errorMessagesView.refreshStatus();
    },

    nodeSelected: function (id, node) {
        this.setConnectionSampleTabVisibility(false);

        this.updateNodeEditor(id, node);

        var outputData = Globals.getOutputSampleFrom(this.session, id);
        if (outputData) {
            this.updateOutputSampleView(outputData);
        } else {
            this.setOutputSampleTabVisibility(false);
        }

        var inputData = Globals.getInputSampleTo(this.session, id);
        if (inputData) {
            this.updateInputSampleView(inputData);
        } else {
            this.setInputSampleTabVisibility(false);
        }

        this.selectTab("editorPane");
    },

    connectionSelected: function (con) {
        this.nothingSelected();

        var connectionData = Globals.getOutputSampleFrom(this.session, con.sourceId, con.targetId);
        if (connectionData !== undefined) {
            this.updateConnectionSampleView(connectionData);
            this.selectTab("connectionSamplePane");
        }
    },

    errorSelected: function (nodeId) {
        if (nodeId === undefined) {
            this.nothingSelected();
        }
        this.selectTab("errorMessagesPane");
    },

    nothingSelected: function () {
        this.setConnectionSampleTabVisibility(false);
        this.setOutputSampleTabVisibility(false);
        this.setInputSampleTabVisibility(false);
        this.setNodeEditorTabVisibility(false);
    },

    selectTab: function (tabName) {
      $('#detailsAreaTabs a[href="#' + tabName + '"]').tab('show');
    },

    updateNodeEditor: function (id, node) {
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

        this.setNodeEditorTabVisibility(true);
    },

    updateOutputSampleView: function (data) {
        this.outputSampleView.updateData(data);
        this.setOutputSampleTabVisibility(true);
    },

    updateInputSampleView: function (data) {
        this.inputSampleView.updateData(data);
        this.setInputSampleTabVisibility(true);
    },

    updateConnectionSampleView: function (data) {
        this.connectionSampleView.updateData(data);
        this.setConnectionSampleTabVisibility(true);
    },

    setConnectionSampleTabVisibility: function (visible) {
        this.setTabVisibility(".connectionSampleTab", visible);
    },

    setNodeEditorTabVisibility: function (visible) {
        this.setTabVisibility(".editorTab", visible);
    },

    setOutputSampleTabVisibility: function (visible) {
        this.setTabVisibility(".outputSampleTab", visible);
    },

    setInputSampleTabVisibility: function (visible) {
        this.setTabVisibility(".inputSampleTab", visible);
    },

    setTabVisibility: function (selector, visible) {
        var tab = this.$el.find("#detailsAreaTabs " + selector);
        if (visible) {
            tab.show();
        } else {
            tab.hide();
        }
    }
  });

  return DetailsArea;
});