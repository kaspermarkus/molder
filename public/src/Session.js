var fs = require('fs');

define(['backbone', 'globals', 'app/detailsArea/DetailsArea', 'app/mainGraph/MainGraph', 'app/quickBar/QuickBar', 'app/node/nodeView', 'jsplumb'], function(BackBone, Globals, DetailsArea, MainGraph, QuickBar, NodeView, jsPlumb) {
  var session = {
    nodePrototypes: {},
    idCount: 0,
    mold: {},
    sampleData: {},
    errors: [],
    warnings: [],
    nodeViews: {},
    currentMoldFile: undefined,

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
        } else if (fromNode.outputs.indexOf(toId) === -1) { // dont double add
          fromNode.outputs.push(toId);
        }

        var toNode = this.mold[toId];
        if (toNode.inputs === null) {
          toNode.inputs = [fromId];
        } else if (fromNode.inputs.indexOf(fromId) === -1) {
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
    },

    saveMold: function (filename) {
      if (filename) {
        console.log("SAVING AS ", filename);
        this.currentMoldFile = filename;
      }

      if (!this.currentMoldFile) {
        console.log("ERROROROROOROROR: trying to save mold but dont know where");
      } else {
        console.log("Saving to ", this.currentMoldFile);
        var toSave = {
          mold: this.mold,
          uiMetadata: {},
          metadata: {
            idCount: this.idCount
          }
        };

        // Add position info:
        for (var nodeId in this.nodeViews) {
          toSave.uiMetadata[nodeId] = {
            position: this.nodeViews[nodeId].$el.position()
          };
        }

        // write to filesystem:
        console.log("SAVING MOLD: " + JSON.stringify(toSave, null, 2));
        fs.writeFileSync(this.currentMoldFile, JSON.stringify(toSave, null, 2), { flag: "w" });
      }
    },
    clearMold: function (metadata) {
      this.mold = {};
      this.sampleData = {};
      this.errors = [];
      this.warnings = [];
      for (var nodeId in this.nodeViews) {
        this.nodeViews[nodeId].destroy();
      }
      this.currentMoldFile = undefined;
      this.idCount = metadata.idCount;
    },

    getSourceEndpointUUID: function (nodeId) {
      var endpoints = jsPlumb.getEndpoints(nodeId);
      for (var index in endpoints) {
        var endpoint = endpoints[index];
        if (endpoint.isSource) {
          return jsPlumb.getEndpoints(nodeId)[index].getUuid();
        }
      }
    },

    getTargetEndpointUUID: function (nodeId) {
      var endpoints = jsPlumb.getEndpoints(nodeId);
      for (var index in endpoints) {
        var endpoint = endpoints[index];
        if (endpoint.isTarget) {
          return jsPlumb.getEndpoints(nodeId)[index].getUuid();
        }
      }
    },

    loadMold: function (filename) {
      console.log("LOADING ", filename);
      var content = fs.readFileSync(filename).toString();
      var json = JSON.parse(content);

      // clear current mold:
      this.clearMold(json.metadata);

      this.mold = json.mold;
      this.currentMoldFile = filename;
      // draw the nodes onto the screen:
      for (var nodeId in this.mold) {
        this.nodeViews[nodeId] = new NodeView({
            fromLoad: true,
            position: json.uiMetadata[nodeId].position,
            node: json.mold[nodeId],
            nodeId: nodeId,
            session: this
        });
      }
      // draw the connections on the screen
      jsPlumb.ready(_.bind(function() {
        for (var nodeId in this.mold) {
          var node = this.mold[nodeId];
          for (var toIndex in node.outputs) {
            jsPlumb.connect({
              uuids: [ this.getSourceEndpointUUID(nodeId), this.getTargetEndpointUUID(node.outputs[toIndex])]
            });
          }

        }
      }, this));
      Globals.tryMold(this);
    }
  };

  _.extend(session, BackBone.Events);

  var detailsArea = new DetailsArea({ session: session });
  var mainGraph = new MainGraph({ session: session });
  var quickBar = new QuickBar({ session: session, el: "#quickBar" });

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