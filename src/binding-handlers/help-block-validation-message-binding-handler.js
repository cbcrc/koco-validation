// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import ko from 'knockout';
import $ from 'jquery';


ko.bindingHandlers['helpBlockValidationMessage'] = {
    'update': function(element, valueAccessor) {
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