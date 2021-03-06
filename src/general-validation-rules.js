import ko from 'knockout';


ko.validation.rules['mustEqual'] = {
    validator: function(val, otherVal) {
        return val === otherVal;
    },
    message: 'The field must equal {0}'
};

ko.validation.rules['mustNotEqual'] = {
    validator: function(val, otherVal) {
        return val !== otherVal;
    },
    message: 'The field must not equal {0}'
};

ko.validation.rules.urlfriendly = {
    validator: function(val /*, otherVal*/ ) {
        var isValid = true;

        if (val) {
            isValid = /^[a-zA-Z0-9_-]*$/.test(val);
        }

        return isValid;
    },
    message: 'This field only accepts url-safe characters (alphanumeric or underscore / dash)'
};

// useful for checking if a checkbox has been checked.
ko.validation.rules['notEmpty'] = {
    validator: function(val) {
        return val.length > 0;
    },
    message: 'This cannot be empty'
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