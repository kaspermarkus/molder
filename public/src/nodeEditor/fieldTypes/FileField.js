const {dialog} = require('electron').remote;

define(["backbone", "session", "jsplumb",
    "app/nodeEditor/fieldTypes/Field",
    "text!./templates/fileField.html",
    "jquery-ui"],
    function (Backbone, Session, jsplumb, Field, Template) {
  'use strict';

  /*
  * View for setting up the objective function and the budget.
  */
  var FileField = Field.extend({
    fieldName: null,
    fieldInfo: null,
    node: null,
    template: _.template(Template),

    initialize: function (options) {
        _.bindAll(this, 'showDialog');
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
        // this.$("#" + this.fieldName).change(_.bind(this.fireChangedEvent, this));
        this.$("#" + this.fieldName).click(this.showDialog);
        this.checkProblems();
    },

    showDialog: function () {
        var currentVal = this.$("#" + this.fieldName).val();
        var tmp = dialog.showOpenDialog({
          properties: ['openFile'],
          defaultPath: currentVal
        });
        if (tmp) {
            this.$("#" + this.fieldName).val(tmp);
            this.fireChangedEvent();
        }
    }
  });

  return FileField;
});