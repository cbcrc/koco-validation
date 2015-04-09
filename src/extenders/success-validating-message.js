// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

define(['knockout'], function(ko) {
    "use strict";

    ko.extenders.successValidatingMessage = function(target, options) {
    	target.validatingMessage = options.validatingMessage;
    	target.validMessage = options.validMessage;
    };
});
