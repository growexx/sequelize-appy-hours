const validation = require("../../util/validation")

class SignUpValidator extends validation {
  constructor(body, locale) {
    super(locale)
    this.body = body
  }

  validate() {
    super.email(this.body.email)
    super.password(this.body.password)
    super.firstName(this.body.firstName)
    super.lastName(this.body.lastName)
  }

  otpValidate() {
    super.email(this.body.email)
    super.otp(this.body.otp)
  }
}

module.exports = SignUpValidator
