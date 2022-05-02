
class CouchDbError extends Error {
    constructor(message) {
      super(message);
      this.name = "CouchDbError";
    }
}


class ServerError extends Error {
    constructor(message) {
      super(message);
      this.name = "ServerError";
    }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class ApplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ApplicationError";
  }
}


module.exports.CouchDbError = CouchDbError;
module.exports.ServerError = ServerError;
module.exports.ValidationError = ValidationError;
module.exports.ApplicationError = ApplicationError;