define(['backbone', 'globals'], function (Backbone, Globals) {
  'use strict';

  /*
  * View for setting up the objective function and the budget.
  */
  var SampleDataView = Backbone.View.extend({
    fromId: undefined,
    toId: undefined,
    headers: null,
    data: null,

    initialize: function (options) {
      this.el = options.el;
      this.session = options.session;
    },

    /**
     * returns false if no data is present in sample
     */
    refreshData: function (fromId, toId) {
      this.fromId = fromId;
      this.toId = toId;
      return this.refreshSample();
    },

    refreshSample: function () {
      var sample = Globals.getSample(this.session, this.fromId, this.toId);

        if (sample === undefined || sample === null) {
          return false;
        }

        this.data = sample.data;
        this.headers = sample.columns,
        this.render();
        return true;
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

    hasData: function () {
      return (this.headers !== undefined && this.headers !== null);
    },

    destroy: function () {
        // this.$el.find("#nodeEditor").remove();
        this.unbind();
        this.undelegateEvents();
        this.stopListening();
        // this.session.off("samplingFinished");
        console.log("UNBINDING EVENTS FOR SAMPLE: " + this.fromId + " -> " + this.toId);
        this.remove();
      }
  });
  return SampleDataView;
});