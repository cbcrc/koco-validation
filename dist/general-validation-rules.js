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
        global.generalValidationRules = mod.exports;
    }
})(this, function (_knockout) {
    'use strict';

    var _knockout2 = _interopRequireDefault(_knockout);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    _knockout2.default.validation.rules['mustEqual'] = {
        validator: function validator(val, otherVal) {
            return val === otherVal;
        },
        message: 'The field must equal {0}'
    };

    _knockout2.default.validation.rules['mustNotEqual'] = {
        validator: function validator(val, otherVal) {
            return val !== otherVal;
        },
        message: 'The field must not equal {0}'
    };

    _knockout2.default.validation.rules.urlfriendly = {
        validator: function validator(val /*, otherVal*/) {
            var isValid = true;

            if (val) {
                isValid = /^[a-zA-Z0-9_-]*$/.test(val);
            }

            return isValid;
        },
        message: 'This field only accepts url-safe characters (alphanumeric or underscore / dash)'
    };

    // useful for checking if a checkbox has been checked.
    _knockout2.default.validation.rules['notEmpty'] = {
        validator: function validator(val) {
            return val.length > 0;
        },
        message: 'This cannot be empty'
    };

    // technically not a validation rule, this extender simply triggers validation
    // on another observable. Useful for validating a range of dates, for example,
    // where a change to startDate could cause endDate's dateIsAfter rule to be validated.
    _knockout2.default.extenders.triggerValidationOn = function (target, dependency) {
        target.subscribe(function () {
            // force knockout validation to rerun validation on dependency
            _knockout2.default.validation.validateObservable(dependency);
            // update UI (validate() is defined in bootstrap-validation-extender.js)
            dependency.validate();
        });
        return target;
    };
});