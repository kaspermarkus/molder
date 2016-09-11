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
    maxLength: null,
    node: null,
    charFieldTemplate: _.template(CharFieldTemplate),

    initialize: function (options) {
        this.validateOptions(options);
        this.maxLength = options.maxLength || 2;
        this.render();
    },

    render: function () {
        var fieldTemplate = $(this.charFieldTemplate({
            id: this.fieldName,
            name: this.fieldInfo.name,
            value: this.node.fields[this.fieldName],
            maxLength: this.maxLength,

        }));
        this.$el.html(fieldTemplate);
        this.$("#" + this.fieldName).change(_.bind(this.fireChangedEvent, this));
    }
  });

  return CharField;
});