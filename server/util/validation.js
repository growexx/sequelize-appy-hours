const GeneralError = require("../util/GeneralError")
const REQUIRED = "FIELD_REQUIRED"
const INVALID = "FIELD_NOT_VALID"

class Validator {
  constructor(locale) {
    this.NOT_VALID = INVALID
    this.REQUIRED = REQUIRED

    if (locale) {
      this.__ = locale
    }
  }

  email(email) {
    if (!email) {
      throw new GeneralError(this.__(REQUIRED, "Email"), 400)
    }

    if (!CONSTANTS.REGEX.EMAIL.test(email)) {
      throw new GeneralError(this.__(INVALID, "Email"), 400)
    }
  }

  password(password) {
    if (!password) {
      throw new GeneralError(this.__(REQUIRED, "Password"), 400)
    }

    if (password.length !== 8) {
      throw new GeneralError(this.__(INVALID, "Password"), 400)
    }
  }

  firstName(firstName) {
    if (!firstName) {
      throw new GeneralError(this.__(REQUIRED, "First Name"), 400)
    }

    if (!CONSTANTS.REGEX.FIRSTNAME.test(firstName)) {
      throw new GeneralError(this.__(INVALID, "First Name"), 400)
    }
  }

  lastName(lastName) {
    if (!lastName) {
      throw new GeneralError(this.__(REQUIRED, "Last Name"), 400)
    }

    if (!CONSTANTS.REGEX.SURNAME.test(lastName)) {
      throw new GeneralError(this.__(INVALID, "Last Name"), 400)
    }
  }

  otp(otp, field = "OTP") {
    if (!otp) {
      throw new GeneralError(this.__(REQUIRED, field), 400)
    }

    if (otp.toString().length !== CONSTANTS.OTPLENGTH) {
      throw new GeneralError(this.__(INVALID, field), 400)
    }
  }

  token(token, field = "token") {
    if (!token) {
      throw new GeneralError(this.__(REQUIRED, field), 400)
    }
  }
}

module.exports = Validator
