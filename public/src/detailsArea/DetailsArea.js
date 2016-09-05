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
        _.bindAll(this, 'setNodeSelected', 'setConnectionSelected', 'errorSelected');
        this.session = options.session;
        this.inputSampleView = new SampleDataView({
            session: this.session,
            el: "#inputSamplePane",
        });
        this.outputSampleView = new SampleDataView({
            session: this.session,
            el: "#outputSamplePane",
        });
        this.connectionSampleView = new SampleDataView({
            session: this.session,
            el: "#connectionSamplePane",
        });
        this.errorMessagesView = new ErrorMessagesView({
            el: "#errorMessagesPane",
            session: this.session
        });

        this.setNothingSelected();
        this.listenTo(this.session, "samplingFinished", _.bind(this.refreshSample, this));
    },

    refreshSample: function () {
        if (this.selected.nodeId) {
            this.updateOutputSampleView(this.selected.nodeId);
            this.updateInputSampleView(this.selected.nodeId);
        } else if (this.selected.connection) {
            var con = this.selected.connection;
            this.updateConnectionSampleView(con.sourceId, con.targetId);
        }
    },

    updateStatus: function () {
        this.errorMessagesView.refreshStatus();
    },

    setNodeSelected: function (id, node) {
        this.selected = {
            nodeId: id
        };

        this.setConnectionSampleTabVisibility(false);
        this.updateNodeEditor(id, node);
        this.updateOutputSampleView(id);
        this.updateInputSampleView(id);

        this.selectTab("editorPane");
    },

    setConnectionSelected: function (con) {
        this.setNothingSelected();
        this.selected = {
            connection: con
        };
        this.updateConnectionSampleView(con.sourceId, con.targetId);
        this.selectTab("connectionSamplePane");
    },

    errorSelected: function (nodeId) {
        if (nodeId === undefined) {
            this.setNothingSelected();
        }
        this.selectTab("errorMessagesPane");
    },

    setNothingSelected: function () {
        this.selected = {}
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

    updateOutputSampleView: function (nodeId) {
        var hasSample = this.outputSampleView.refreshData(nodeId, undefined);
        // show tab if there is data to show
        this.setOutputSampleTabVisibility(hasSample);
    },

    updateInputSampleView: function (nodeId) {
        var hasSample = this.inputSampleView.refreshData(undefined, nodeId);
        // show tab if there is data to show
        this.setInputSampleTabVisibility(hasSample);
    },

    updateConnectionSampleView: function (sourceId, targetId) {
        var hasSample = this.connectionSampleView.refreshData(sourceId, targetId);
        // show tab if there is data to show
        this.setConnectionSampleTabVisibility(hasSample);
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