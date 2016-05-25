'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

_knockout2.default.bindingHandlers['helpBlockValidationMessage'] = {
    'update': function update(element, valueAccessor) {
        var message = _knockout2.default.utils.unwrapObservable(valueAccessor());
        var $element = (0, _jquery2.default)(element);

        if (message) {
            $element.html(message);
            $element.show();
        } else {
            $element.html('');
            $element.hide();
        }
    }
};