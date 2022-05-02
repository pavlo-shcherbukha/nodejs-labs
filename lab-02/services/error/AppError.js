
class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
    }
}


class PropertyError extends Error {
    constructor(message, prop) {
      super(message);
      this.name = "PropertyError";
      this.property = prop ;
    }
}

module.exports.PropertyError = PropertyError;
module.exports.ValidationError = ValidationError;
