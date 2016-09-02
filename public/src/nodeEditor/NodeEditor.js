define(["backbone", "session", "jsplumb",
    "text!./templates/nodeEditor.html",
    "app/nodeEditor/fieldTypes/CharField",
    "app/nodeEditor/fieldTypes/FileField",
    "app/nodeEditor/fieldTypes/BoolField",
    "app/nodeEditor/fieldTypes/ColumnsSelectorField",
    "jquery-ui"],
    function (Backbone, Session, jsplumb, NodeEditorTemplate, CharField, FileField, BoolField, ColumnsSelectorField) {
  'use strict';

  /*
  * View for setting up the objective function and the budget.
  */
  var NodeEditor = Backbone.View.extend({
    node: null,
    proto: null,
    fields: {}, // will contain a list of Field views, keyed by fieldNames
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
            var field;
            var fieldInfo = this.proto.fields[fieldName];

            var standardOpts = {
                fieldName: fieldName,
                fieldInfo: fieldInfo,
                node: this.node,
                session: this.session
            };

            // render the field depending on type:
            switch (fieldInfo.type) {
                case "char":
                    field = new CharField(standardOpts);
                    break;
                case "file":
                    field = new FileField(standardOpts);
                    break;
                case "boolean":
                    field = new BoolField(standardOpts);
                    break;
                case "array":
                    if (fieldInfo["sub-type"] === "column-name") {
                        field = new ColumnsSelectorField(standardOpts);
                    }
                    break;
                default:
                    throw "Unknown field type encountered... Not attempting to render...";
            }

            field.on("changed", this.fieldChanged);
            fieldsArea.append(field.el);

            this.fields[fieldName] = field;

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
            newVals[fieldName] = this.fields[fieldName].getValue();
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