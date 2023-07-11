const SignInService = require("./signInService")
const Utils = require("../../util/utilFunctions")

class SignInController {
  static async login(req, res) {
    try {
      const data = await SignInService.signIn(req, res.__)
      Utils.sendResponse(null, data, res, MESSAGES.LOGIN_SUCCESS)
    } catch (error) {
      Utils.sendResponse(error, null, res, error.message)
    }
  }

  static async refreshToken(req, res) {
    try {
      const data = await SignInService.refreshToken(req, res.__)
      Utils.sendResponse(null, data, res, MESSAGES.SUCCESS)
    } catch (error) {
      Utils.sendResponse(error, null, res, error.message)
    }
  }
}

module.exports = SignInController
