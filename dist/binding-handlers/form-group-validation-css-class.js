define(['knockout', 'jquery'], function (ko, $) {
    "use strict";

    ko.bindingHandlers['formGroupValidationCssClass'] = {
        'update': function (element, valueAccessor) {
            var cssClass = ko.utils.unwrapObservable(valueAccessor());
            var $element = $(element);
            $element.removeClass('has-warning').removeClass('has-success').removeClass('has-error');

            if (cssClass) {
                $element.addClass(cssClass);
            }
        }
    };
});