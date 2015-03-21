define(['knockout', 'jquery'], function (ko, $) {
    "use strict";

    ko.bindingHandlers['feedbackValidationCssClass'] = {
        'update': function (element, valueAccessor) {
            var cssClass = ko.utils.unwrapObservable(valueAccessor());
            var $element = $(element);
            $element.removeClass('fa fa-spin fa-pulse').removeClass('fa fa-times').removeClass('fa fa-check');

            if (cssClass) {
                $element.addClass(cssClass);
            }
        }
    };
});