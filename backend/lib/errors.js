const config = require('../config');

class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
    // http code
    this.status = status || 500;
  }
}

class ValidationError extends AppError {
  constructor(fieldsErrors, nonFieldErrors) {
    super('Validation failed.', 400);
    // validation errors for each field
    this.fieldErrors = (fieldsErrors || []).map((e) => {
      // nested errors (joi.alternatives)
      if (!e.path.length && Array.isArray(e.context.details)) {
        return ({
          field: e.context.details[0].path[0],
          message: e.context.details[0].message,
        });
      }
      return ({ field: e.path[0], message: e.message });
    });
    this.nonFieldErrors = nonFieldErrors || [];
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Not found.') {
    super(message, 404);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized.') {
    super(message, 401);
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden.') {
    super(message, 403);
  }
}

class ConflictError extends AppError {
  constructor(message = 'Conflict.') {
    super(message, 409);
  }
}

class TooManyRequestsError extends AppError {
  constructor(retryAfter) {
    super('Too many requests.', 429);
    this.retryAfter = retryAfter;
  }
}

const errors = {
  AppError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  TooManyRequestsError,
};

module.exports = errors;
