const jwt = require("jsonwebtoken")
const Utils = require("../util/utilFunctions")
const User = require("../models").user
const HTTPStatus = require("../util/http-status")

const checkUser = (me, res, next) => {
  User.findOne({ where: { id: me.id } })
    .then((userObj) => {
      const responseObject = Utils.errorResponse()
      if (!userObj) {
        responseObject.message = res.__("ACCESS_DENIED")
        res.status(HTTPStatus.UNAUTHORIZED).send(responseObject)
        return
        // 0 = deactivate, 1 = activate
      } else if (userObj.is_active === 0) {
        responseObject.data = {
          status: userObj.is_active,
          message: res.__("DEACTIVATE_ACCOUNT_BY_ADMIN")
        }
        res.status(HTTPStatus.ACCOUNT_SUSPENDED).send(responseObject)
        return
      } else {
        // Do nothing
      }
      delete userObj.dataValues.password
      delete userObj.dataValues.otp
      delete userObj.dataValues.reset_token

      res.locals.user = userObj
      next()
    })
    .catch(next)
}

module.exports = function (req, res, next) {
  const token = req.headers.authorization
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, tokenDetail) => {
    if (err) {
      const responseObject = Utils.errorResponse()
      responseObject.message = res.__("ACCESS_DENIED")
      res.status(HTTPStatus.UNAUTHORIZED).send(responseObject)
    } else {
      checkUser(tokenDetail, res, next)
      return
    }
  })
}
