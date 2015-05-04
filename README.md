# koco validation

A set of utilities to help with Bootstrap & Knockout-Validation.

## Installation

    bower install koco-validation

## Usage with KOCO

```javascript
// require.config.js
paths: {
	...
	'validation-utilities': 'bower_components/koco-validation/src/validation-utilities'
	...
}
```

```javascript
// knockout-extenders.js
define([
    'bower_components/koco-validation/src/extenders/bootstrap-validation-extender',
    'bower_components/koco-validation/src/extenders/success-validating-message-extender',
    ...
], function() {
    'use strict';


});
```

```javascript
// knockout-binding-handlers.js
define([

        'bower_components/koco-validation/src/binding-handlers/form-group-validation-css-class-binding-handler',
        'bower_components/koco-validation/src/binding-handlers/help-block-validation-message-binding-handler',
        'bower_components/koco-validation/src/binding-handlers/feedback-validation-css-class-binding-handler',
        ...
    ],
    function() {
        'use strict';


    });

```

## Features

- Support for Bootstrap validation classes.
- Async knockout validations with custom message.