/* global QUnit, require */

"use strict";

require.config({
    baseUrl: '../lib',
    paths: {
        bootstrap: './bootstrap/js/bootstrap',
        QUnit: './qunit/qunit',
        app: '../src',
        test: '../test',
        globals: '../src/globals',
        session: '../src/Session',
        "bootstrap-select": './bootstrap-select',
        jsPlumb: './jsPlumb'
    },
    shim: {
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       },
       // 'bootstrap': ['jquery', 'jquery-ui'],
       // 'jquery-sortable-min': ['jquery']
    }
});

// require the unit tests.
require(
    ['QUnit', 'test/dummyTests'],
    function(QUnit, dummyTests) {
        // run the tests.
        dummyTests.run();
        // dummyTest2.run();
        // // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);