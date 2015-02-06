define(['knockout', 'jquery'],
    function(ko, $) {
        "use strict";

        ko.extenders.bootstrapValidation = function(target) {
            for (var i in target()) {
                if (ko.validation.utils.isValidatable(target()[i])) {
                    extendProperty(target()[i]);
                }
            }
            
            target.isValidating = ko.computed(function() {
                return !!target.errors.find(function(obsv) {
                    return ko.validation.utils.isValidatable(obsv) && obsv.isValidating();
                });
            });

            target.isValidAsync = function() {
                var deferred = new $.Deferred();
                for (var i in target()) {
                    if (ko.validation.utils.isValidatable(target()[i])) {
                        target()[i].validate();
                    }
                }

                if (!target.isValidating()) {
                    deferred.resolve(target.isValid());
                } else {
                    var subscription = target.isValidating.subscribe(function() {
                        deferred.resolve(target.isValid());
                        subscription.dispose();
                    });
                }

                return deferred.promise();
            };

            //return the original observable
            return target;
        };

        function extendProperty(target) {
            //add some sub-observables to our observable
            target.formGroupValidationCssClass = ko.observable('');
            target.helpBlockValidationMessage = ko.observable('');

            //define a function to do validation
            target.validate = function() {
                var cssClass = '';
                var message = '';

                if (target.isValidating()) {
                    if (target.validatingMessage) {
                        cssClass = 'has-warning';
                        message = target.validatingMessage;
                    }
                } else {
                    if (target.isValid()) {
                        cssClass = 'has-success';

                        if (target.validMessage) {
                            message = target.validMessage;
                        }
                    } else {
                        cssClass = 'has-error';

                        if (target.error) {
                            message = target.error();
                        }
                    }
                }

                target.formGroupValidationCssClass(cssClass);
                target.helpBlockValidationMessage(message);
            };

            target.isValidating.subscribe(function() {
                target.validate();
            });

            //validate whenever the value changes
            target.subscribe(function() {
                target.validate();
            });
        }
    });
