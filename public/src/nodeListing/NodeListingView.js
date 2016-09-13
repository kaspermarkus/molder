define(['backbone', 'session', 'jsplumb', './NodePrototypeView', '../node/nodeView', 'jquery-ui'], function (Backbone, Session, jsPlumb, NodePrototypeView, NodeView) {
  'use strict';

  /*
  * View for setting up the objective function and the budget.
  */
  var NodeListingView = Backbone.View.extend({
    el: $("#nodeListing"),

    initialize: function () {
        this.render();
    },

    render: function () {
        var session = Session.currentSession();
        console.log("globals: ", session);
        this.$el.text("");

        var list = $("<ul/>").addClass("nodeCategories");
        $.each(session.nodeCategorization, function (categoryId, category) {
            var item = $('<li/>').addClass("nodeCategoryHeader");
            var header = $('<h3/>').text(category.name).appendTo(item);
            item.appendTo(list);
            var sublist = $("<ul/>").addClass("nodeList");
            $.each(category.nodes, function (ind, nodeType) {
                var icon = $("<img/>").addClass("nodeIcon");
                icon.attr('src', "imgs/" + session.nodePrototypes[nodeType].ui.icon);
                var nodeDiv = $("<div/>").addClass("nodePrototype").attr('id', nodeType);
                nodeDiv.append(icon);
                nodeDiv.append($("<label/>").text(session.nodePrototypes[nodeType]["type-name"]));

                var nodeItem = $("<li/>");
                nodeItem.append(nodeDiv);

                jsPlumb.ready(function () {
                    nodeDiv.draggable({
                        containment: '#mainArea',
                        helper: "clone",
                        appendTo: "#graphArea",
                        revert: false,
                        stop: function (evt, ui) {
                            new NodeView({
                                session: session,
                                position: ui.position,
                                nodeType: nodeType
                            });
                            // console.log(JSON.stringify(ui, null, 2));
                            // var newNode = $("<div/>").addClass("item").css(ui.position);
                            // $("#graphArea").append(newNode);

                        }
                    });
                    jsPlumb.draggable(nodeType);

                });


                sublist.append(nodeItem);
            });
            sublist.appendTo(item);
        });
        this.$el.append(list);
    }
  });

  return NodeListingView;
});
