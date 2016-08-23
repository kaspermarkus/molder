define(["backbone", "session", "jsplumb",
    "text!./templates/nodeEditor.html",
    "text!./templates/charField.html",
    "text!./templates/fileField.html",
    "text!./templates/booleanField.html",
    "jquery-ui"],
    function (Backbone, Session, jsplumb, NodeEditorTemplate, CharFieldTemplate, FileFieldTemplate, BooleanFieldTemplate) {
  'use strict';

  /*
  * View for setting up the objective function and the budget.
  */
  var NodeEditor = Backbone.View.extend({
    node: null,
    proto: null,
    charFieldTemplate: _.template(CharFieldTemplate),
    fileFieldTemplate: _.template(FileFieldTemplate),
    booleanFieldTemplate: _.template(BooleanFieldTemplate),
    nodeEditorTemplate: _.template(NodeEditorTemplate),

    initialize: function (options) {
        _.bindAll(this, 'fieldChanged', 'revertFields', 'saveChanges');
        this.node = options.node;
        this.proto = options.proto;
        this.el = options.el;
        this.session = options.session;
        this.render();
        this.noChanges();
    },

    render: function () {
        var editor = $(this.nodeEditorTemplate({
            nodeName: this.node.name
        }));
        this.$el.html(editor);
        var fieldsArea = editor.find("#nodeEditorFields");

        for (var fieldName in this.proto.fields) {
            var html;
            var fieldInfo = this.proto.fields[fieldName];

            // render the field depending on type:
            if (fieldInfo.type === "char") {
                // render char:
                html = $(this.charFieldTemplate({
                    id: fieldName,
                    name: fieldInfo.name,
                    value: this.node.fields[fieldName]
                }));
                html.find("#" + fieldName).change(this.fieldChanged);
                fieldsArea.append(html);
            } else if (fieldInfo.type === "file") {
                // render file:
                html = $(this.fileFieldTemplate({
                    id: fieldName,
                    name: fieldInfo.name,
                    value: this.node.fields[fieldName]
                }));
                html.find("#" + fieldName).change(this.fieldChanged);
                fieldsArea.append(html);
            } else if (fieldInfo.type === "boolean") {
                // render boolean:
                html = $(this.booleanFieldTemplate({
                    id: fieldName,
                    name: fieldInfo.name
                }));
                html.find("#" + fieldName).attr("checked", this.node.fields[fieldName]);
                html.find("#" + fieldName).change(this.fieldChanged);
                fieldsArea.append(html);
            }
        }

        // Set up button events:
        this.$el.find(".buttonsArea .cancel").click(this.revertFields);
        this.$el.find(".buttonsArea .updateNode").click(this.saveChanges);
    },

    fieldChanged: function (evt, a, b) {
        // show warning
        this.$el.find(".warningBanner").text("Warning: Unsaved changes.").show();
        this.$el.find(".buttonsArea input").attr("disabled", false);
    },

    noChanges: function () {
        this.$el.find(".warningBanner").hide();
        this.$el.find(".buttonsArea input").attr("disabled", true);
    },

    revertFields: function () {
        this.noChanges();
        this.$el.find("#nodeEditorFields").get(0).reset();
    },

    saveChanges: function () {
        /* TODO run some sort of validation */
        var newVals = {};

        for (var fieldName in this.proto.fields) {
            var fieldInfo = this.proto.fields[fieldName];
            var val;
            // render the field depending on type:
            if (fieldInfo.type === "char") {
                val = this.$el.find("#nodeEditorFields #" + fieldName).val();
                newVals[fieldName] = val;
            } else if (fieldInfo.type === "file") {
                val = this.$el.find("#nodeEditorFields #" + fieldName).val();
                newVals[fieldName] = val;
            } else if (fieldInfo.type === "boolean") {
                val = this.$el.find("#nodeEditorFields #" + fieldName).is(':checked');
                newVals[fieldName] = val;
            }
        }
        this.noChanges();
        this.session.updateNode(this.node.id, newVals);
    },

    destroy: function () {
        this.$el.find("#nodeEditor").remove();
        // TODO unbind, etc.
    }
  });

  return NodeEditor;
});