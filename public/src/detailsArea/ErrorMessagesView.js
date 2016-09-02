define(['backbone', 'session', 'globals'],
  function (Backbone, Session, Globals) {
  'use strict';

  /*
  * View for setting up the objective function and the budget.
  */
  var ErrorMessagesView = Backbone.View.extend({
    session: null,

    initialize: function (options) {
        this.session = options.session;
    },

    refreshStatus: function () {
        var errors = this.session.errors;
        var warnings = this.session.warnings;
        this.drawTable(errors, warnings);
    },

    drawTable: function (errors, warnings) {
      // clear everything
      this.$el.text("");


      var index;
      var row;
      var cell;
      this.table = $('<table></table>').addClass('table');

      // create first header row:
      row = $("<thead></thead>").append('<tr></tr>');
      row.append("<th>Node</th>");
      row.append("<th>Error type</th>");
      row.append("<th>Description</th>");
      this.table.append(row);

      var tableBody = $("<tbody></tbody>");
      // draw errors:
      this.drawEntries(tableBody, errors, "bg-danger");
      this.drawEntries(tableBody, warnings, "bg-warning");
      this.table.append(tableBody);

      this.$el.html(this.table);
    },

    drawEntries: function (table, entries, classes) {
      var row, cell;
      for (var index in entries) {
        var data = entries[index];
        row = $('<tr></tr>').addClass(classes).addClass(data.node);
        row.append("<td>" + data.node + "</td>");
        row.append("<td>" + data.type + "</td>");
        row.append("<td>" + data.description + "</td>");
        table.append(row);
      }
    }
  });

  return ErrorMessagesView;
});