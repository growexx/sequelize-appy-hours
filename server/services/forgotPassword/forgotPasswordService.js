const Crypt = require("../../util/crypt")
const User = require("../../models").user
// const Email = require('../../util/sendEmail');
const validation = require("../../util/validation")
const Random = require("randomstring")
const { Op } = require("sequelize")

class ForgotPasswordService {
  static async forgotPassword(req, locale) {
    const Validator = new validation(locale)
    await Validator.email(req.body.email)
    const userEmail = req.body.email.toLowerCase()
    const userObj = await User.findOne({ where: { email: userEmail } })
    if (userObj) {
      const resetLink = Random.generate(12)
      const appUrl = process.env.FRONTEND_URL
      const actionURL = `${appUrl}/reset-password/${resetLink}`
      const date = MOMENT().add(1, "day").utc()
      await User.update(
        { reset_token: resetLink, reset_expiry_time: date },
        { where: { email: userEmail } }
      )

      const subject = "Reset your password to access your account"
      const template = "emailTemplates/forgotPasswordMail.html"
      const templateVariables = { appUrl, actionURL }
      // await Email.prepareAndSendEmail([req.body.email], subject, template, templateVariables);
    }
  }

  static async verifyToken(req) {
    if (!req.body.token) {
      throw {
        message: MESSAGES.LINK_IS_NOT_VALID,
        statusCode: 400
      }
    }

    const compareDate = MOMENT().utc().unix()
    const userList = await User.findOne({
      where: { reset_token: req.body.token }
    })
    if (
      !userList ||
      compareDate > MOMENT(userList.reset_expiry_time).utc().unix()
    ) {
      throw {
        message: MESSAGES.RESET_LINK_EXPIRED,
        statusCode: 400
      }
    }
  }

  static async resetPassword(req, locale) {
    if (!req.body.token || !req.body.password) {
      throw {
        message: MESSAGES.INVALID_REQUEST,
        statusCode: 400
      }
    }

    const Validator = new validation(locale)
    await Validator.password(req.body.password)

    const userList = await User.findOne({
      where: {
        reset_token: req.body.token,
        reset_expiry_time: {
          [Op.not]: null
        }
      }
    })
    const compareDate = MOMENT().utc().unix()
    if (userList && userList.reset_expiry_time) {
      if (compareDate > MOMENT(userList.reset_expiry_time).utc().unix()) {
        throw {
          message: MESSAGES.RESET_LINK_EXPIRED,
          statusCode: 400
        }
      } else {
        const hash = await Crypt.enCryptPassword(req.body.password)
        if (hash) {
          await User.update(
            {
              password: hash,
              reset_expiry_time: null,
              reset_token: null
            },
            { where: { reset_token: req.body.token } }
          )
        }
      }
    }
  }
}

module.exports = ForgotPasswordService
