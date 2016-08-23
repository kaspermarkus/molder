define([], function() {
  var Globals = {
    backend: 'http://localhost:8109',

    tryMold: function (session) {
        $.ajax({
        type: "POST",
        url: Globals.backend + "/run",
        data: JSON.stringify(session.mold),
        contentType: "application/json",
        // dataType: "json",
        async: true,
        success : function (result) {
            window.alert("It fucking worked:\n " + JSON.stringify(result));
            session.trigger("tryFinished", result);
        },
        error: function (err) {
            window.alert("Error testing the mold...\nTODO: Proper error handling here!");
        }
      });
    }
  };

  return Globals;
});
