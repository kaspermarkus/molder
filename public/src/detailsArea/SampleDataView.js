define(['backbone'], function (Backbone) {
  'use strict';

  /*
  * View for setting up the objective function and the budget.
  */
  var SampleDataView = Backbone.View.extend({
    headers: null,
    data: null,

    updateData: function (data) {
      this.headers = data.columns;
      this.data = data.data;
      this.render();
    },

    orderHeaders: function (headers) {
      var ordering = [];
      for (var h in headers) {
        ordering[headers[h].index] = h;
      }
      return ordering;
    },

    render: function () {
      // clear everything
      this.$el.text("");

      var orderedHeaders = this.orderHeaders(this.headers);
      var index;
      var row;
      var cell;
      this.table = $('<table></table>').addClass('table').addClass("table-striped");

      // create first header row:
      row = $("<thead></thead>").append('<tr></tr>');
      for (index in orderedHeaders) {
        cell = $('<th></th>').html(orderedHeaders[index]);
        row.append(cell);
      }
      this.table.append(row);

      var tableBody = $("<tbody></tbody>");

      for (index in this.data) {
        row = $('<tr></tr>');
        for (var col in this.data[index]) {
          var content = this.data[index][col];
          cell = $('<td></td>').html(content);
          row.append(cell);
        }
        tableBody.append(row);
      }
      this.table.append(tableBody);

      this.$el.html(this.table);
    },

    destroy: function () {
      //TODO
    }
  });
  return SampleDataView;
});