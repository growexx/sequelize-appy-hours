const HTTPStatus = require("./http-status")

class Utils {
  static errorResponse() {
    return JSON.parse(
      JSON.stringify({
        status: 0,
        data: {},
        message: ""
      })
    )
  }

  static successResponse() {
    return JSON.parse(
      JSON.stringify({
        status: 1,
        data: {},
        message: ""
      })
    )
  }

  static sendResponse(error, data, res, successMessage, successMessageVars) {
    let responseObject

    if (error) {
      let status
      responseObject = Utils.errorResponse()
      if (typeof error === "object") {
        responseObject.message = error.message
          ? error.message
          : res.__("ERROR_MSG")
        status = error.statusCode ? error.statusCode : HTTPStatus.BAD_REQUEST
      } else {
        responseObject.message = res.__(error)
        status = HTTPStatus.BAD_REQUEST
      }

      responseObject.data = error.data
      res.status(status).send(responseObject)
    } else {
      responseObject = Utils.successResponse()
      responseObject.message = successMessageVars
        ? res.__.apply("", [successMessage].concat(successMessageVars))
        : successMessage
      responseObject.data = data
      res.status(HTTPStatus.OK).send(responseObject)
    }
  }

  static generateOtp() {
    return "123456"
    // TODO: for now we are returning 123456 as OTP
    // else {
    //   return Math.floor(Math.random() * 900000) + 100000
    // }
  }

  static async paginator(Model, options, page, limit) {
    const data = await Model.paginate(options)
    return {
      docs: data.docs,
      totalDocs: data.total,
      totalPages: Math.ceil(data.total / _.toInteger(limit)),
      page,
      limit
    }
  }
}

module.exports = Utils
