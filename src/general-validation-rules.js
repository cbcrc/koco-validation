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
});