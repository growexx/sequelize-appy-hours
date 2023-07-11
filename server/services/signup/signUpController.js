const SignUpService = require("./signUpService")
const Utils = require("../../util/utilFunctions")

class SignUpController {
  static async signUp(req, res) {
    console.log("signUp ~ res:", res.__)
    try {
      req.body.userType = CONSTANTS.ROLE.USER
      const data = await SignUpService.signUp(req, res.__)
      Utils.sendResponse(null, data, res, MESSAGES.REGISTER_SUCCESS)
    } catch (error) {
      Utils.sendResponse(error, null, res, error.message)
    }
  }

  static async verifyAccount(req, res) {
    try {
      const data = await SignUpService.verifyAccount(req, res.__)
      Utils.sendResponse(null, data, res, MESSAGES.USER_VERIFY_SUCCESS)
    } catch (error) {
      Utils.sendResponse(error, null, res, error.message)
    }
  }

  static async resendOTP(req, res) {
    try {
      const data = await SignUpService.resentOTP(req, res.__)
      Utils.sendResponse(null, data, res, MESSAGES.REGISTER_SUCCESS)
    } catch (error) {
      Utils.sendResponse(error, null, res, error.message)
    }
  }
}

module.exports = SignUpController
