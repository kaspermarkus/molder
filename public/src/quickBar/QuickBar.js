define(['backbone', 'session', 'globals', "text!./quickBar.html",
], function (Backbone, Session, Globals, Template) {
  'use strict';

  /*
  * View for setting up the objective function and the budget.
  */
  var NodePrototypeView = Backbone.View.extend({
    // el: $("#quickBar"),
    session: null,
    template: _.template(Template),

    initialize: function (options) {
        this.el = options.el;
        this.session = options.session;
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        this.$el.find(".errorIcon").click(_.bind(function () {
            this.session.trigger("errorClicked");
        }, this));
    },

    updateStatus: function () {
        var hasErrors = (this.session.errors.length !== 0);

        this.setIconVisibility(".errorIcon", hasErrors);
        this.setIconVisibility(".playIcon", !hasErrors);

        // only show warning icon if there are no errors AND there are warnings
        this.setIconVisibility(".warningIcon", (this.session.warnings.length > 0 && !hasErrors));
    },

    setLoading: function (loading) {
        this.setIconVisibility(".loadingIcon", loading);
    },

    setIconVisibility: function (icon, visible) {
        this.$el.find(icon).toggle(visible);
    }
  });

  return NodePrototypeView;
});