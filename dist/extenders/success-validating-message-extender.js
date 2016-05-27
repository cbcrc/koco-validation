(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['knockout'], factory);
    } else if (typeof exports !== "undefined") {
        factory(require('knockout'));
    } else {
        var mod = {
            exports: {}
        };
        factory(global.knockout);
        global.successValidatingMessageExtender = mod.exports;
    }
})(this, function (_knockout) {
    'use strict';

    var _knockout2 = _interopRequireDefault(_knockout);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    _knockout2.default.extenders.successValidatingMessage = function (target, options) {
        target.validatingMessage = options.validatingMessage;
        target.validMessage = options.validMessage;
    }; // Copyright (c) CBC/Radio-Canada. All rights reserved.
    // Licensed under the MIT license. See LICENSE file in the project root for full license information.
});