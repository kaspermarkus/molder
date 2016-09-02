define(['backbone', 'session', 'globals', 'jsplumb', "text!./nodeIconTemplate.html", "jquery-ui"], function (Backbone, Session, Globals, jsplumb, IconTemplate) {
  'use strict';

  /*
  * View for setting up the objective function and the budget.
  */
  var NodeView = Backbone.View.extend({
    iconTemplate: _.template(IconTemplate),
    session: null,

    initialize: function (options) {
        var session = Session.currentSession();
        this.session = session;
        var id = session.getNewNodeId();
        var node = this.createNode(id, options.nodeType);
        var html = this.createHTML(node, options.position);
        html.click(function () {
            session.trigger("nodeSelected", { node: node, html: html, id: id });
        });
        html.find(".statusIcon").hide();

        $("#graphArea").append(html);
        this.setElement("#graphArea #" + id);

        this.addPlumbing(node);

        // add node to session:
        session.addNode(id, node, this);
        Globals.tryMold(session);
    },

    showError: function (error) {
        this.$el.find(".errorIcon").show();
    },

    showWarning: function (warning) {
        this.$el.find(".warningIcon").show();
    },

    createNode: function (nodeId, nodeType) {
        var node = {
            type: nodeType,
            id: nodeId,
            name: "My " + this.session.nodePrototypes[nodeType]["type-name"],
            inputs: null,
            outputs: null,
            fields: {}
        };
        for (var fieldId in this.session.nodePrototypes[nodeType].fields) {
            var proto = this.session.nodePrototypes[nodeType].fields[fieldId];
            node.fields[fieldId] = proto["default"];
        }
        return node;
    },

    createHTML: function (node, position) {
        // create node html
        var html = this.iconTemplate();
        html = $(html).css(position).addClass("item").attr("id", node.id);
        html.find("img.nodeTypeIcon").attr('src', "imgs/" + this.session.nodePrototypes[node.type].ui.icon);
        html.find("label").text(node.name);
        return html;
    },

    addPlumbing: function (node) {
        var metadata = this.session.nodePrototypes[node.type];

        jsplumb.ready(_.bind(function() {
            jsPlumb.setContainer($("#graphArea"));

            // make it draggable
            jsPlumb.draggable(node.id, {
                containment: true
            });

            // add endpoints:
            if (metadata["out-points"] !== 0) {
                jsPlumb.addEndpoint(node.id, {
                    anchors: ["Right"],
                    isSource: true,
                    isTarget: false,
                    connector: ["Flowchart"],
                    maxConnections: 1,
                    hoverPaintStyle:{ fillStyle:"lightblue" },
                    connectorOverlays: [
                        ["Arrow" , { width: 25, length: 25, location: 0.67 }]
                    ]
                });
            }
            if (metadata["in-points"] !== 0) {
                jsPlumb.addEndpoint(node.id, {
                    anchors: ["Left"],
                    isSource: false,
                    isTarget: true,
                    connector: ["Flowchart"],
                    // maxConnections: 1,
                    hoverPaintStyle:{ fillStyle:"lightblue" }
                });
            }
        }, this));
    }
  });

  return NodeView;
});



            // var common = {
            //     connector: ["Straight"],
            //     anchor: ["Left", "Right"],
            //     endpoint:"Dot",
            //     paintStyle:{ strokeStyle:"lightgray", lineWidth:3 },
            //     endpointStyle:{ fillStyle:"lightgray", outlineColor:"gray" },
            //     overlays:[ ["Arrow" , { width:12, length:12, location:0.67 }] ]
            // };

            // jsPlumb.connect({
            //     source:"item_left",
            //     target:"item_right"
            // }, common);

            // var commonEndpoint = {
            //     isSource:true,
            //     isTarget:true,
            //     connector: ["Straight"]
            // };


            // jsPlumb.addEndpoint("item_up", {
            //     anchors:["Right"]
            // }, commonEndpoint);

            // jsPlumb.addEndpoint("item_down", {
            //     anchors:["Left", "Right"],
            // }, commonEndpoint);


            // jsPlumb.addEndpoint("item_left", {
            //     /* Endpoint-Position */
            //     anchor:"Right",

            //     /* Endpoint-Style */
            //     endpoint:"Rectangle",
            //     paintStyle:{ fillStyle:"white", outlineColor:"blue", outlineWidth:1 },
            //     hoverPaintStyle:{ fillStyle:"lightblue" },

            //     /* Connector(Line)-Style */
            //     connectorStyle:{ strokeStyle:"blue", lineWidth:1 },
            //     connectorHoverStyle:{ lineWidth:2 }

            // }, commonEndpoint);