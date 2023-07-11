const crypt = require("../../util/crypt")
const SignUpValidator = require("./signUpValidator")
const UtilFunctions = require("../../util/utilFunctions")
// const Email = require("../../util/sendEmail")
const User = require("../../models").user

class SignUpService {
  static async signUp(req, locale) {
    const Validator = new SignUpValidator(req.body, locale)
    Validator.validate()

    req.body.email = req.body.email.toLowerCase()
    const user = await SignUpService.isUserAlreadyRegister(req.body)
    if (!user) {
      const hash = await crypt.enCryptPassword(req.body.password)
      const otp = UtilFunctions.generateOtp()
      const userType = req.body.userType
      await SignUpService.saveOrUpdateRegistrationUser(
        req.body,
        hash,
        otp,
        userType
      )
      const subject = "Lets invent the future of work"
      const template = "emailTemplates/verificationOtpMail.html"
      const appUrl = process.env.FRONTEND_URL
      const templateVariables = { appUrl, otp }
      //   await Email.prepareAndSendEmail(
      //     [req.body.email],
      //     subject,
      //     template,
      //     templateVariables
      //   )
      return { email: req.body.email, role: userType }
    } else if (!user.is_active) {
      throw {
        message: MESSAGES.INACTIVE_USER,
        statusCode: 400
      }
    } else {
      return await SignUpService.checkLogin(req.body.password, user)
    }
  }

  static async checkLogin(password, user) {
    const isMatch = await crypt.comparePassword(password, user.password)
    const otherDetails = {}
    if (!isMatch) {
      throw {
        message: MESSAGES.ALREADY_REGISTER,
        statusCode: 422
      }
    } else {
      const token = await crypt.getUserAccessToken(user)
      const refreshToken = await crypt.getUserRefreshToken(user)
      user.password = null
      _.merge(user, token, otherDetails)
      _.merge(user, { refreshToken: refreshToken.token })
    }

    return user
  }

  static async isUserAlreadyRegister(reqObj) {
    return await User.findOne({ where: { email: reqObj.email } })
  }

  static async saveOrUpdateRegistrationUser(reqObj, hash, otp, userType) {
    const obj = {
      first_name: reqObj.firstName,
      last_name: reqObj.lastName,
      email: reqObj.email,
      password: hash,
      is_active: CONSTANTS.STATUS.PENDING,
      role: userType,
      otp
    }
    await User.create(obj)
  }

  static async verifyAccount(req, locale) {
    const Validator = new SignUpValidator(req.body, locale)
    Validator.otpValidate()
    req.body.email = req.body.email.toLowerCase()
    let user = await User.findOne({ where: { email: req.body.email } })
    if (user && user.otp === req.body.otp) {
      await User.update(
        { is_active: CONSTANTS.STATUS.ACTIVE },
        { where: { id: user.id } }
      )
      user = await User.findOne({ where: { email: req.body.email } })
      const token = await crypt.getUserAccessToken(user)
      const refreshToken = await crypt.getUserRefreshToken(user)
      return { token: token.token, refreshToken: refreshToken.token }
    } else {
      throw {
        message: MESSAGES.INVALID_OTP,
        statusCode: 400
      }
    }
  }

  static async resentOTP(req, locale) {
    const Validator = new SignUpValidator(req.body, locale)
    Validator.email(req.body.email)
    req.body.email = req.body.email.toLowerCase()
    const user = await User.findOne({ where: { email: req.body.email } })
    if (user) {
      const subject = "Lets invent the future of work"
      const template = "emailTemplates/verificationOtpMail.html"
      const appUrl = process.env.FRONTEND_URL
      const templateVariables = { appUrl, otp: user.otp }
      //   await Email.prepareAndSendEmail(
      //     [user.email],
      //     subject,
      //     template,
      //     templateVariables
      //   )
      return { email: req.body.email }
    } else {
      throw {
        message: MESSAGES.USER_NOT_FOUND,
        statusCode: 400
      }
    }
  }
}

module.exports = SignUpService
