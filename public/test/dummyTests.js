/* global QUnit, define */

"use strict";

define(["session", "app/quickBar/QuickBar"
    ], function(
        Session,
        QuickBar
        ) {
        var run = function() {
            QUnit.module( 'QuickBar tests', {
                beforeEach: function() {
                    $('body').append('<div id="quickBar"></div>');
                },
                afterEach: function() {
                    if (this.todoView) {
                        this.todoView.remove();
                    }
                    $('#quickBar').remove();
                }
            });

            var warnings = [{
                type: "parameter-error",
                field: "column-names",
                description: "myError"
            }];

            var errors = [{
                type: "parameter-error",
                field: "column-names",
                description: "myError"
            }];

            var testIcons = function (description, playIconAssert, warningIconAssert, errorIconAssert, session) {
                QUnit.test(description, function (assert) {
                    this.todoView = new QuickBar({
                        session: session,
                        el: "#quickBar"
                    });
                    this.todoView.updateStatus();
                    assert.ok($("#quickBar").is(":visible"), "Quick bar is visible");
                    assert[playIconAssert](this.todoView.$el.find(".playIcon").is(":visible"),
                        "play icon visibility check");
                    assert[warningIconAssert](this.todoView.$el.find(".warningIcon").is(":visible"),
                        "warning icon visibility check");
                    assert[errorIconAssert](this.todoView.$el.find(".errorIcon").is(":visible"),
                        "error icon visibility check");
                    });

            };

            testIcons('Only play icon should be shown when no errors or warnings', "ok", "notOk", "notOk", {
                errors: [],
                warnings: []
            });

            testIcons("Play and warning icons should be shown if there are warnings but no errors",
                "ok", "ok", "notOk", {
                errors: [],
                warnings: warnings
            });

            testIcons("Only error icon should be shown if there are errors and no warnings",
                "notOk", "notOk", "ok", {
                errors: errors,
                warnings: []
            });

            testIcons("Only error icon should be shown if there are errors and warnings",
                "notOk", "notOk", "ok", {
                errors: errors,
                warnings: warnings
            });
        };

        return { run: run };
    }
);
