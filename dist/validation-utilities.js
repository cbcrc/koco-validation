(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jquery', 'lodash'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('lodash'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jquery, global.lodash);
        global.validationUtilities = mod.exports;
    }
})(this, function (exports, _jquery, _lodash) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _jquery2 = _interopRequireDefault(_jquery);

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    // Copyright (c) CBC/Radio-Canada. All rights reserved.
    // Licensed under the MIT license. See LICENSE file in the project root for full license information.

    var ValidationUtilities = function ValidationUtilities() {};

    ValidationUtilities.prototype.validateObservables = function (validatedObservables) {
        var promise = new _jquery2.default.Deferred(function (dfd) {
            if (_lodash2.default.isEmpty(validatedObservables)) {
                // When passing an empty array of validated observables, the form is considered valid.
                dfd.resolve(true);
            }

            try {
                var validationPromises = [];

                for (var i = 0; i < validatedObservables.length; i++) {
                    validationPromises.push(validatedObservables[i].isValidAsync());
                }

                _jquery2.default.when.apply(_jquery2.default, validationPromises).done(function () {
                    var isValid = true;

                    for (var j = 0; j < arguments.length; j++) {
                        isValid = isValid && arguments[j];
                    }

                    dfd.resolve(isValid);
                }).fail(function () {
                    dfd.reject.apply(this, arguments);
                });
            } catch (error) {
                dfd.reject(error);
            }
        }).promise();

        return promise;
    };

    exports.default = new ValidationUtilities();
});