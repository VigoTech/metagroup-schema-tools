const Validator = require('jsonschema').Validator

const Source = {
  validate(data, schema) {
    return new Validator().validate(data, schema)
  }
}

module.exports = Source