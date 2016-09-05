define(["backbone", "session", "jsplumb",
    "text!./templates/charField.html",
    "jquery-ui"],
    function (Backbone, Session, jsplumb) {
  'use strict';

  /*
  * View for setting up the objective function and the budget.
  */
  var NodeEditor = Backbone.View.extend({
    fieldName: null,
    fieldInfo: null,
    node: null,
    session: null,

    validateOptions: function (options) {
        this.fieldName = this.ensureAndAssign(options, "fieldName");
        this.fieldInfo = this.ensureAndAssign(options, "fieldInfo");
        this.node = this.ensureAndAssign(options, "node");
        this.session = this.ensureAndAssign(options, "session");
        this.listenTo(this.session, "samplingFinished", _.bind(this.updatedSample, this));
        // this.session.on("samplingFinished", _.bind(this.updatedSample, this));
    },

    updatedSample: function (data) {
        this.checkProblems();
    },

    checkProblems: function () {
        this.$(".help-block").html("");
        this.$(".has-error").removeClass("has-error");
        this.$(".has-warning").removeClass("has-warning");

        var errors = this.session.errors.filter(_.bind(this.isProblemForThisField, this));
        var warnings = this.session.warnings.filter(_.bind(this.isProblemForThisField, this));

        for (var err in errors) {
          this.markProblem("error", errors[err]);
        }

        for (var warn in warnings) {
          this.markProblem("warning", warnings[warn]);
        }
    },

    isProblemForThisField: function (problem) {
        return problem.node === this.node.id && problem.field === this.fieldName;
    },

    markProblem: function (type, details) {
        // mark all fields with the field name as either class or id
        this.$("." + this.fieldName).addClass((type === "error" ? "has-error" : "has-warning"));
        this.$("#" + this.fieldName).addClass((type === "error" ? "has-error" : "has-warning"));
        // print help error message if present:
        var helpBlock = this.$(".help-block");
        if (helpBlock.length > 0 && details.description) {
          helpBlock.append($("<span>").text(details.description));
        }
    },

    ensureAndAssign: function (options, name) {
        if (!(name in options)) {
            throw name + " required for charField";
        }
        return options[name];
    },

    fireChangedEvent: function (e) {
        this.trigger("changed", e);
    },

    getValue: function () {
        return this.$("#" + this.fieldName).val();
    },

    destroy: function () {
        // this.$el.find("#nodeEditor").remove();
        this.unbind();
        this.undelegateEvents();
        this.stopListening();
        // this.session.off("samplingFinished");
        console.log("UNBINDING EVENTS FOR FIELD: " + this.fieldName);
        this.remove();
        // TODO unbind, etc.
    }
  });

  return NodeEditor;
});