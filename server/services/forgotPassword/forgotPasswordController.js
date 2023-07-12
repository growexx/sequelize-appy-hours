const ForgotPasswordService = require("./forgotPasswordService")
const Utils = require("../../util/utilFunctions")

class ForgotPasswordController {
  static async forgotPassword(req, res) {
    try {
      const data = await ForgotPasswordService.forgotPassword(req, res.__)
      Utils.sendResponse(
        null,
        data,
        res,
        MESSAGES.FORGOT_PASSWORD_LINK_SENT_SUCCESS
      )
    } catch (error) {
      Utils.sendResponse(error, null, res, error.message)
    }
  }

  static async verifyToken(req, res) {
    try {
      const data = await ForgotPasswordService.verifyToken(req, res.__)
      Utils.sendResponse(null, data, res, MESSAGES.LINK_IS_VALID)
    } catch (error) {
      Utils.sendResponse(error, null, res, error.message)
    }
  }

  static async resetPassword(req, res) {
    try {
      const data = await ForgotPasswordService.resetPassword(req, res.__)
      Utils.sendResponse(null, data, res, MESSAGES.RESET_PASSWORD_SUCCESS)
    } catch (error) {
      CONSOLE_LOGGER.error(error)
      Utils.sendResponse(error, null, res, error.message)
    }
  }
}

module.exports = ForgotPasswordController
