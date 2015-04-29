// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

define(['jquery', 'lodash'],
    function($, _) {
        'use strict';

        var KnockoutValidationUtilities = function KnockoutValidationUtilities() {};

        KnockoutValidationUtilities.prototype.validateObservables = function (validatedObservables) {
            var promise = new $.Deferred(function(dfd) {
                if (_.isEmpty(validatedObservables)) {
                    // When passing an empty array of validated observables, the form is considered valid.
                    dfd.resolve(true);
                }

                try {
                    var validationPromises = [];

                    for (var i = 0; i < validatedObservables.length; i++) {
                        validationPromises.push(validatedObservables[i].isValidAsync());
                    }

                    $.when.apply($, validationPromises).done(function() {
                        var isValid = true;

                        for (var j = 0; j < arguments.length; j++) {
                            isValid = isValid && arguments[j];
                        }

                        dfd.resolve(isValid);
                    }).fail(function() {
                        dfd.reject.apply(this, arguments);
                    });
                } catch (error) {
                    dfd.reject(error);
                }
            }).promise();

            return promise;
        };

        return new KnockoutValidationUtilities();
    });
