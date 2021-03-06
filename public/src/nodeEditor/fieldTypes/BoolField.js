define(["backbone", "session", "jsplumb",
    "app/nodeEditor/fieldTypes/Field",
    "text!./templates/booleanField.html",
    "jquery-ui"],
    function (Backbone, Session, jsplumb, Field, Template) {
  'use strict';

  /*
  * View for setting up the objective function and the budget.
  */
  var BoolField = Field.extend({
    fieldName: null,
    fieldInfo: null,
    node: null,
    template: _.template(Template),

    initialize: function (options) {
        this.validateOptions(options);
        this.render();
    },

    render: function () {
        var fieldTemplate = $(this.template({
            id: this.fieldName,
            name: this.fieldInfo.name,
            value: this.node.fields[this.fieldName]
        }));
        this.$el.html(fieldTemplate);
        this.$("#" + this.fieldName).attr("checked", this.node.fields[this.fieldName]);
        this.$("#" + this.fieldName).change(_.bind(this.fireChangedEvent, this));
    },

    getValue: function () {
        return this.$("#" + this.fieldName).is(':checked');
    }
  });

  return BoolField;
});