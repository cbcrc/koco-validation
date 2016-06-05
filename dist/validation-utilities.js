(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.validationUtilities = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var ValidationUtilities = function () {
    function ValidationUtilities() {
      _classCallCheck(this, ValidationUtilities);
    }

    _createClass(ValidationUtilities, [{
      key: "validateObservables",
      value: function validateObservables(validatedObservables) {
        if (validatedObservables && validatedObservables.length) {
          var validationPromises = [];

          for (var i = 0; i < validatedObservables.length; i++) {
            validationPromises.push(validatedObservables[i].isValidAsync());
          }

          return Promise.all(validationPromises).then(function (values) {
            return values.every(function (value) {
              return !!value;
            });
          });
        }

        // When passing an empty array of validated observables, the form is considered valid.
        return Promise.resolve(true);
      }
    }]);

    return ValidationUtilities;
  }();

  exports.default = new ValidationUtilities();
});