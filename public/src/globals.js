define([], function() {
  var Globals = {
    backend: 'http://localhost:8109',

    tryMold: function (session) {
        $.ajax({
        type: "POST",
        url: Globals.backend + "/try",
        data: JSON.stringify(session.mold),
        contentType: "application/json",
        // dataType: "json",
        async: true,
        success : function (result) {
            session.samplingFinished(result);
        },
        error: function (result) {
            session.samplingFinished(result.responseJSON);
            // TODO probably more handling here
        }
      });
    },

    /* given the session (with sampleData) and a node-id
     * this function will return the sample data that goes
     * out from the given node
     *
     * TODO: Support multiple outputs from node */
    getOutputSampleFrom: function (session, id) {
        var data = session.sampleData[id];
        for (var con in data) {
          return data[con];
        }
        return undefined;
    },

    getSample: function (session, from, to) {
      if (to === undefined) {
        return this.getOutputSampleFrom(session, from);
      } else if (from === undefined) {
        return this.getInputSampleTo(session, to);
      } else {
        return (session.sampleData[from] ? session.sampleData[from][to] : undefined);
      }
    },

    /* given the session (with sampleData) and a node-id
     * this function will return the sample data that
     * goes into the node
     *
     * TODO: Support multiple inputs to node */
    getInputSampleTo: function (session, id) {
        var outs;
        for (var otherId in session.sampleData) {
            if (id in session.sampleData[otherId]) {
                return session.sampleData[otherId][id];
            }
        }
        return undefined;
    }
  };

  return Globals;
});
