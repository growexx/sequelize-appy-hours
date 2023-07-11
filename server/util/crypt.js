const bcrypt = require("bcryptjs")
const JWT = require("./jwt")

class Crypt {
  static async enCryptPassword(password) {
    const salt = await bcrypt.genSalt(CONSTANTS.SALT_ROUNDS)
    return await bcrypt.hash(password, salt)
  }

  static async comparePassword(compare, original) {
    return await bcrypt.compare(compare, original)
  }

  static async getUserAccessToken(user) {
    const token = await JWT.generateAccessToken({
      id: user.id,
      email: user.email
    })

    return {
      token
    }
  }

  static async getUserRefreshToken(user) {
    const token = await JWT.generateRefreshToken({
      id: user.id,
      email: user.email
    })

    return {
      token
    }
  }
}

module.exports = Crypt
