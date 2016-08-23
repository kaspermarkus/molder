define(['backbone', 'globals', 'app/detailsArea/DetailsArea', 'app/mainGraph/MainGraph'], function(BackBone, Globals, DetailsArea, MainGraph) {
  var session = {
    nodePrototypes: {},
    idCount: 0,
    mold: {},

    getNewNodeId: function () {
        return "node" + (this.idCount++);
    },

    addNode: function (nodeId, node) {
        this.mold[nodeId] = node;
    },

    updateNode: function (nodeId, fields) {
        this.mold[nodeId].fields = fields;
        // fire up the backend:
        Globals.tryMold(this);
    },

    getNodePrototype: function (nodeType) {
        return this.nodePrototypes[nodeType];
    }
  };

  var detailsArea = new DetailsArea({ session: session });
  var mainGraph = new MainGraph({ session: session });

  _.extend(session, BackBone.Events);

  session.on("nodeSelected", function (options) {
    detailsArea.showNodeEditorView(options.id, options.node);
    mainGraph.unselectNodes();
    mainGraph.selectNode(options.id);
    // alert("Triggered " + msg);
  });

  return {
    currentSession: function () {
        return session;
    }
  };
});