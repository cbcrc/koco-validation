define(['knockout'], function(ko) {
    'use strict';

    ko.validation.rules['mustEqual'] = {
        validator: function (val, otherVal) {
            return val === otherVal;
        },
        message: 'The field must equal {0}'
    };

    ko.validation.rules['mustNotEqual'] = {
        validator: function (val, otherVal) {
            return val !== otherVal;
        },
        message: 'The field must not equal {0}'
    };

    // technically not a validation rule, this extender simply triggers validation
    // on another observable. Useful for validating a range of dates, for example,
    // where a change to startDate could cause endDate's dateIsAfter rule to be validated.
    ko.extenders.triggerValidationOn = function(target, dependency) {
        target.subscribe(function() {
            // force knockout validation to rerun validation on dependency
            ko.validation.validateObservable(dependency);
            // update UI (validate() is defined in bootstrap-validation-extender.js)
            dependency.validate();
        });
        return target;
    };
});