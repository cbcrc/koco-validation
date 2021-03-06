// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import ko from 'knockout';
import _ from 'lodash';

//TODO: https://github.com/Knockout-Contrib/Knockout-Validation/issues/145#issuecomment-73754720
ko.extenders.bootstrapValidation = function(target) {
  extendProperties(target);

  target.isValidating = ko.computed(function() {
    if (target.errors) {
      return !!target.errors.find(function(obsv) {
        return ko.validation.utils.isValidatable(obsv) && obsv.isValidating();
      });
    } else if (target.error) {
      return ko.validation.utils.isValidatable(target) && target.isValidating();
    }

    return false;
  });

  target.isValidAsync = function() {
    return new Promise((resolve) => {
      traverse(target(), function(key, value) {
        if (ko.validation.utils.isValidatable(value) && value.validate) {
          value.validate();
        }
      });

      if (!target.isValidating()) {
        resolve(target.isValid());
      } else {
        var subscription = target.isValidating.subscribe(function() {
          resolve(target.isValid());
          subscription.dispose();
        });
      }
    });
  };

  target.subscribe(function() {
    extendProperties(target);
  });

  //return the original observable
  return target;
};

function extendProperties(target) {
  traverse(target(), function(key, value) {
    if (ko.validation.utils.isValidatable(value)) {
      extendProperty(value);
    }
  });
}

function traverse(o, func) {
  _.forIn(o, function(value, key) {
    if (key !== '__ko_mapping__') {
      func(key, value);

      var unwrapped = ko.unwrap(value);
      if (unwrapped !== null && typeof(unwrapped) === 'object') {
        traverse(unwrapped, func);
      }
    }
  });
}

function extendProperty(target) {
  if (target.validate) {
    return;
  }

  //add some sub-observables to our observable
  target.formGroupValidationCssClass = ko.observable('');
  target.helpBlockValidationMessage = ko.observable('');
  target.feedbackValidationCssClass = ko.observable('');

  //define a function to do validation
  target.validate = function() {
    var cssClass = '';
    var feedbackClass = '';
    var message = '';

    var isValidating = target.isValidating();
    if (isValidating) {
      if (isValidating === true && target.validatingMessage) {
        //cssClass = 'has-warning';
        feedbackClass = 'fa fa-pulse fa-spin';
        message = target.validatingMessage;
      }
    } else {
      if (target.isValid()) {
        cssClass = 'has-success';
        feedbackClass = 'fa fa-check';

        if (target.validMessage) {
          message = target.validMessage;
        }
      } else {
        if (target.error) {
          cssClass = 'has-error';
          feedbackClass = 'fa fa-times';
          message = target.error();
        }
      }
    }

    target.formGroupValidationCssClass(cssClass);
    target.feedbackValidationCssClass(feedbackClass);
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
