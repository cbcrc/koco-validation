'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; // Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//TODO: https://github.com/Knockout-Contrib/Knockout-Validation/issues/145#issuecomment-73754720
_knockout2.default.extenders.bootstrapValidation = function (target) {
    extendProperties(target);

    target.isValidating = _knockout2.default.computed(function () {
        if (target.errors) {
            return !!target.errors.find(function (obsv) {
                return _knockout2.default.validation.utils.isValidatable(obsv) && obsv.isValidating();
            });
        } else if (target.error) {
            return _knockout2.default.validation.utils.isValidatable(target) && target.isValidating();
        }

        return false;
    });

    target.isValidAsync = function () {
        return new _jquery2.default.Deferred(function (dfd) {
            try {
                traverse(target(), function (key, value) {
                    if (_knockout2.default.validation.utils.isValidatable(value) && value.validate) {
                        value.validate();
                    }
                });

                if (!target.isValidating()) {
                    dfd.resolve(target.isValid());
                } else {
                    var subscription = target.isValidating.subscribe(function () {
                        dfd.resolve(target.isValid());
                        subscription.dispose();
                    });
                }
            } catch (err) {
                dfd.reject(err);
            }
        }).promise();
    };

    target.subscribe(function () {
        extendProperties(target);
    });

    //return the original observable
    return target;
};

function extendProperties(target) {
    traverse(target(), function (key, value) {
        if (_knockout2.default.validation.utils.isValidatable(value)) {
            extendProperty(value);
        }
    });
}

function traverse(o, func) {
    _lodash2.default.forIn(o, function (value, key) {
        if (key !== '__ko_mapping__') {
            func(key, value);

            var unwrapped = _knockout2.default.unwrap(value);
            if (unwrapped !== null && (typeof unwrapped === 'undefined' ? 'undefined' : _typeof(unwrapped)) === 'object') {
                traverse(unwrapped, func);
            }
        }
    });
}

function extendProperty(target) {
    if (target.validate) {
        return;
    }

    //add some sub-observables to our observable
    target.formGroupValidationCssClass = _knockout2.default.observable('');
    target.helpBlockValidationMessage = _knockout2.default.observable('');
    target.feedbackValidationCssClass = _knockout2.default.observable('');

    //define a function to do validation
    target.validate = function () {
        var cssClass = '';
        var feedbackClass = '';
        var message = '';

        var isValidating = target.isValidating();
        if (isValidating) {
            if (isValidating === true && target.validatingMessage) {
                //cssClass = 'has-warning';
                feedbackClass = 'fa fa-pulse fa-spin';
                message = target.validatingMessage;
            }
        } else {
            if (target.isValid()) {
                cssClass = 'has-success';
                feedbackClass = 'fa fa-check';

                if (target.validMessage) {
                    message = target.validMessage;
                }
            } else {
                if (target.error) {
                    cssClass = 'has-error';
                    feedbackClass = 'fa fa-times';
                    message = target.error();
                }
            }
        }

        target.formGroupValidationCssClass(cssClass);
        target.feedbackValidationCssClass(feedbackClass);
        target.helpBlockValidationMessage(message);
    };

    target.isValidating.subscribe(function () {
        target.validate();
    });

    //validate whenever the value changes
    target.subscribe(function () {
        target.validate();
    });
}