const express = require('express');
const logger = require('./logger');
const errors = require('./errors');

const validationOptions = {
  errors: {
    wrap: {
      label: false,
    },
  },
  stripUnknown: true,
};

const getApiRouteHandler = (func, validationSchema) => (...args) => {
  const req = args[args.length - 3];
  const res = args[args.length - 2];
  const next = args[args.length - 1];
  req.valid = {};
  let validationPromise = Promise.resolve();
  if (validationSchema) {
    const isFunction = typeof validationSchema === 'function';
    validationPromise = (isFunction ?
        validationSchema(req) :
        Promise.resolve(validationSchema))
      .then(schema => schema.validateAsync(req.body, validationOptions))
      .then((valid) => {
        req.valid = valid;
        return Promise.resolve();
      })
      .catch(err => Promise.reject(new errors.ValidationError(err.details)));
  }
  return validationPromise
    .then(() => Promise.resolve(func(...args)))
    .then(data => res.json(data))
    .catch(next);
};

module.exports = {
  getApiRouteHandler,
};
