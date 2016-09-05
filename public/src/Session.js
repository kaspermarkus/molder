define(['backbone', 'globals', 'app/detailsArea/DetailsArea', 'app/mainGraph/MainGraph', 'app/quickBar/QuickBar'], function(BackBone, Globals, DetailsArea, MainGraph, QuickBar) {
  var session = {
    nodePrototypes: {},
    idCount: 0,
    mold: {},
    sampleData: {},
    errors: {},
    warnings: {},
    nodeViews: {},

    getNewNodeId: function () {
        return "node" + (this.idCount++);
    },

    addNode: function (nodeId, node, ui) {
        this.mold[nodeId] = node;
        this.nodeViews[nodeId] = ui;
    },

    addConnection: function (fromId, toId) {
        var fromNode = this.mold[fromId];
        if (fromNode.outputs === null) {
          fromNode.outputs = [toId];
        } else {
          fromNode.outputs.push(toId);
        }

        var toNode = this.mold[toId];
        if (toNode.inputs === null) {
          toNode.inputs = [fromId];
        } else {
          toNode.inputs.push(fromId);
        }
        Globals.tryMold(session);
    },

    removeConnection: function (fromId, toId) {
      var ind;

      if (this.mold[fromId].outputs.length === 1) {
        this.mold[fromId].outputs = null;
      } else {
        ind = this.mold[fromId].outputs.indexOf(toId);
        delete this.mold[fromId].outputs[ind];
      }

      if (this.mold[toId].inputs.length === 1) {
        this.mold[toId].inputs = null;
      } else {
        ind = this.mold[toId].inputs.indexOf(fromId);
        delete this.mold[toId].inputs[ind];
      }

      Globals.tryMold(session);
    },

    updateNode: function (nodeId, fields) {
        this.mold[nodeId].fields = fields;
        // fire up the backend:
        Globals.tryMold(this);
    },

    getNodePrototype: function (nodeType) {
        return this.nodePrototypes[nodeType];
    },

    samplingFinished: function (data) {
      session.errors = data.errors;
      session.warnings = data.warnings;
      session.sampleData = data.data;

      this.trigger("samplingFinished", data);
    }
  };

  _.extend(session, BackBone.Events);

  var detailsArea = new DetailsArea({ session: session });
  var mainGraph = new MainGraph({ session: session });
  var quickBar = new QuickBar({ session: session });

  session.on("nodeSelected", function (options) {
    detailsArea.setNodeSelected(options.id, options.node);
    mainGraph.unselectNodes();
    mainGraph.unselectConnections();
    mainGraph.selectNode(options.id);
    // alert("Triggered " + msg);
  });

  session.on("connectionSelected", function (con) {
    detailsArea.setConnectionSelected(con);
    mainGraph.unselectNodes();
    mainGraph.unselectConnections();
    mainGraph.selectConnection(con);
  });

  session.on("samplingStarted", function (data) {
    quickBar.setLoading(true);
  });

  session.on("samplingFinished", function (data) {
    mainGraph.updateStatus();
    detailsArea.updateStatus();
    quickBar.updateStatus();
    quickBar.setLoading(false);
  });

  session.on("errorClicked", function (nodeId) {
    mainGraph.unselectNodes();
    mainGraph.unselectConnections();
    if (nodeId !== undefined) {
      mainGraph.selectNode(options.id);
    }
    detailsArea.errorSelected(nodeId);
  });

  // session.on("warnings", function (warnings) {

  // });

  // session.on("errors", function (errors) {

  // });

  return {
    currentSession: function () {
        return session;
    }
  };
});