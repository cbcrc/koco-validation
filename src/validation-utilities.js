// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

class ValidationUtilities {
  validateObservables(validatedObservables) {
    if (validatedObservables && validatedObservables.length) {
      const validationPromises = [];

      for (let i = 0; i < validatedObservables.length; i++) {
        validationPromises.push(validatedObservables[i].isValidAsync());
      }

      return Promise.all(validationPromises).then((values) => values.every(value => !!value));
    }

    // When passing an empty array of validated observables, the form is considered valid.
    return Promise.resolve(true);
  }
}

export default new ValidationUtilities();
