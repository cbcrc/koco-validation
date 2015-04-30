// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

define(['knockout', 'jquery'], function (ko, $) {
    "use strict";

    ko.bindingHandlers['helpBlockValidationMessage'] = {
        'update': function (element, valueAccessor) {
            var message = ko.utils.unwrapObservable(valueAccessor());
            var $element = $(element);

            if (message) {
                $element.html(message);
                $element.show();
            } else {
                $element.html('');
                $element.hide();
            }
        }
    };
});