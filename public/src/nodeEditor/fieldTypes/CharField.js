define(["backbone", "session", "jsplumb",
    "app/nodeEditor/fieldTypes/Field",
    "text!./templates/charField.html",
    "jquery-ui"],
    function (Backbone, Session, jsplumb, Field, CharFieldTemplate) {
  'use strict';

  /*
  * View for setting up the objective function and the budget.
  */
  var CharField = Field.extend({
    fieldName: null,
    fieldInfo: null,
    node: null,
    charFieldTemplate: _.template(CharFieldTemplate),

    initialize: function (options) {
        this.validateOptions(options);
        this.render();
    },

    render: function () {
        var fieldTemplate = $(this.charFieldTemplate({
            id: this.fieldName,
            name: this.fieldInfo.name,
            value: this.node.fields[this.fieldName]
        }));
        this.$el.html(fieldTemplate);
        this.$("#" + this.fieldName).change(_.bind(this.fireChangedEvent, this));
    },

    destroy: function () {
        // TODO unbind, etc.
    }
  });

  return CharField;
});