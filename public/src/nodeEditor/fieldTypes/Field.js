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
    }
  });

  return NodeEditor;
});