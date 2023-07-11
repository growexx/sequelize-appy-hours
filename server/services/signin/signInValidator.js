const validation = require("../../util/validation")

class SignInValidator extends validation {
  constructor(body, locale) {
    super(locale)
    this.body = body
  }

  validate() {
    super.email(this.body.email)
    super.password(this.body.password)
  }

  validateToken() {
    super.token(this.body.refreshToken, "refreshToken")
  }
}

module.exports = SignInValidator
