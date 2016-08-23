define(['backbone', 'globals'], function (Backbone, Globals) {
  'use strict';

  /*
  * View for setting up the objective function and the budget.
  */
  var NodePrototypeView = Backbone.View.extend({
    el: $("#nodeListing"),

    initialize: function (options) {
        console.log("OPTIONS: ", options);
        // this.render();
    },

    // render: function () {
    //     console.log("globals: ", Globals)
    //     this.$el.text("Nodelisting here");
    // }
  });

  return NodePrototypeView;
});
