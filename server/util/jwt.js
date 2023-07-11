const jwt = require("jsonwebtoken")

class JsonWebToken {
  static generateAccessToken(data) {
    const tokenOptionalInfo = {
      algorithm: "HS256",
      expiresIn: 60 * 60 * 24
    }
    return jwt.sign(data, process.env.JWT_ACCESS_SECRET, tokenOptionalInfo)
  }

  static generateRefreshToken(data) {
    const tokenOptionalInfo = {
      algorithm: "HS256",
      expiresIn: 60 * 60 * 24 * 30
    }
    return jwt.sign(data, process.env.JWT_REFRESH_SECRET, tokenOptionalInfo)
  }
}

module.exports = JsonWebToken
