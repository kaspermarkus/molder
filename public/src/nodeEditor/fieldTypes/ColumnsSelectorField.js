define(["backbone", "globals", "jsplumb",
    "app/nodeEditor/fieldTypes/Field",
    "text!./templates/columnsSelectorField.html",
    "text!./templates/columnsSelectorFieldItem.html",
    "jquery-ui",
    'bootstrap-select'],
    function (Backbone, Globals, jsplumb, Field, Template, ItemTemplate) {
  'use strict';

  var ColumnsSelectorField = Field.extend({
    template: _.template(Template),
    itemTemplate: _.template(ItemTemplate),
    selectedColumns: [],

    initialize: function (options) {
        _.bindAll(this, 'addSelected', 'removeItem');
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
        this.$(".selectpicker").selectpicker();

        this.populateSelect(); // fill select with column names

        this.$(".columnsSelectorField ol").sortable(); // make selected list nice and pretty

        // add to selectedColumns on clicking on add button
        this.$(".addColumn").click(this.addSelected);

        this.refreshSelectedList();
        // this.$("#" + this.fieldName).change(_.bind(this.fireChangedEvent, this));
    },

    /**
     * adds the currently selected column to the list of selected
     */
    addSelected: function () {
        var columnName = this.$(".selectpicker").val();

        if (this.selectedColumns.indexOf(columnName) === -1) {
            this.selectedColumns.push(columnName);
            this.selectedChanged();
        }
    },

    removeItem: function (item) {
        var index = this.selectedColumns.indexOf(item.target.id);
        if (index > -1) {
            this.selectedColumns.splice(index, 1);
            this.selectedChanged();
        }

    },

    selectedChanged: function () {
        this.populateSelect();
        this.refreshSelectedList();
        this.fireChangedEvent();
    },

    refreshSelectedList: function () {
        this.$(".columnsSelectorField ol li img").unbind("click");
        this.$(".columnsSelectorField ol").empty();
        for (var columnName in this.selectedColumns) {
            var item = $(this.itemTemplate({
                id: this.selectedColumns[columnName],
                value: this.selectedColumns[columnName]
            }));
            item.find("img").click(this.removeItem);
            this.$(".columnsSelectorField ol").append(item);
        }
    },

    /**
     * populates the selected box with the current column names
     */
    populateSelect: function () {
        var input = Globals.getInputSampleTo(this.session, this.node.id);
        this.$(".selectpicker").html(""); // clear select first

        if (input !== undefined) {
            for (var columnName in input.columns) {
                // only add to select if not already in selectedColumns list
                if (this.selectedColumns.indexOf(columnName) === -1) {
                    this.$(".selectpicker").append($('<option>', {
                        value: columnName,
                        text: columnName
                    }));
                }
            }
        }
        this.$(".selectpicker").selectpicker("refresh");
    },

    getValue: function () {
        return this.selectedColumns;
    },

    destroy: function () {
        // TODO unbind, etc.
    }
  });

  return ColumnsSelectorField;
});