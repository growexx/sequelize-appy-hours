const Utils = require("../util/utilFunctions")
const HTTPStatus = require("../util/http-status")

module.exports = function (req, res, next) {
  const accessList = {
    1: [
      { method: "GET", path: "/user/details" },
      { method: "PUT", path: "/user/picture" },
      { method: "DELETE", path: "/user/picture" },
      { method: "PUT", path: "/user/password" },
      { method: "GET", path: "/ingredient" },
      { method: "POST", path: "/ingredient" },
      { method: 'GET', path: '/ingredient/details' },
      { method: 'PATCH', path: '/ingredient/change-status' }
    ],
    4: [
      { method: "GET", path: "/user/details" },
      { method: "PUT", path: "/user/picture" },
      { method: "DELETE", path: "/user/picture" },
      { method: "PUT", path: "/user/password" }
    ]
  }

  const role = res.locals.user.role
  const isAllowed = _.find(accessList[role], {
    method: req.method,
    path: req.originalUrl.split("?")[0]
  })

  if (isAllowed) {
    next()
  } else {
    const responseObject = Utils.errorResponse()
    responseObject.message = res.__("ACCESS_DENIED")
    res.status(HTTPStatus.NOT_ACCEPTABLE).send(responseObject)
    return
  }
}
