const jwt = require("jsonwebtoken")
const crypt = require("../../util/crypt")
const SignInValidator = require("./signInValidator")
const User = require("../../models").user

class SignInService {
  static async signIn(req, locale) {
    const Validator = new SignInValidator(req.body, locale)
    Validator.validate()
    const email = req.body.email.toLowerCase()
    return await SignInService.userLogin(email, req.body.password)
  }

  static async refreshToken(req, locale) {
    const Validator = new SignInValidator(req.body, locale)
    Validator.validateToken()
    const { refreshToken } = req.body

    return jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, tokenDetail) => {
        if (err) {
          throw {
            message: MESSAGES.ACCESS_DENIED,
            statusCode: 401
          }
        } else {
          return await crypt.getUserAccessToken({
            id: tokenDetail.id,
            email: tokenDetail.email
          })
        }
      }
    )
  }

  static async userLogin(email, password) {
    const user = await User.findOne({ where: { email } })
    // Wrong username
    if (!user) {
      throw {
        message: MESSAGES.LOGIN_FAILED,
        statusCode: 401
      }
    } else if (user.is_active) {
      // Wrong Password
      const isMatch = await crypt.comparePassword(password, user.password)

      if (!isMatch) {
        throw {
          message: MESSAGES.LOGIN_FAILED,
          statusCode: 401
        }
      } else {
        const token = await crypt.getUserAccessToken(user)
        const refreshToken = await crypt.getUserRefreshToken(user)
        let returnObj = user.dataValues
        delete returnObj.password
        delete returnObj.otp
        returnObj = _.merge(returnObj, token)
        returnObj = _.merge(returnObj, { refreshToken: refreshToken.token })
        return returnObj
      }
    } else {
      throw {
        data: { email: user.email, role: user.role },
        message: MESSAGES.USER_INACTIVE,
        statusCode: 423
      }
    }
  }
}

module.exports = SignInService
