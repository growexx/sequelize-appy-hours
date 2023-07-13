const GeneralError = require("../util/GeneralError")
const REQUIRED = "FIELD_REQUIRED"
const INVALID = "FIELD_NOT_VALID"

class Validator {
  constructor(locale) {
    this.NOT_VALID = INVALID
    this.REQUIRED = REQUIRED

    if (locale) {
      this.__ = locale
    }
  }

  email(email) {
    if (!email) {
      throw new GeneralError(this.__(REQUIRED, "Email"), 400)
    }

    if (!CONSTANTS.REGEX.EMAIL.test(email)) {
      throw new GeneralError(this.__(INVALID, "Email"), 400)
    }
  }

  password(password) {
    if (!password) {
      throw new GeneralError(this.__(REQUIRED, "Password"), 400)
    }

    if (password.length !== 8) {
      throw new GeneralError(this.__(INVALID, "Password"), 400)
    }
  }

  firstName(firstName) {
    if (!firstName) {
      throw new GeneralError(this.__(REQUIRED, "First Name"), 400)
    }

    if (!CONSTANTS.REGEX.FIRSTNAME.test(firstName)) {
      throw new GeneralError(this.__(INVALID, "First Name"), 400)
    }
  }

  lastName(lastName) {
    if (!lastName) {
      throw new GeneralError(this.__(REQUIRED, "Last Name"), 400)
    }

    if (!CONSTANTS.REGEX.SURNAME.test(lastName)) {
      throw new GeneralError(this.__(INVALID, "Last Name"), 400)
    }
  }

  otp(otp, field = "OTP") {
    if (!otp) {
      throw new GeneralError(this.__(REQUIRED, field), 400)
    }

    if (otp.toString().length !== CONSTANTS.OTPLENGTH) {
      throw new GeneralError(this.__(INVALID, field), 400)
    }
  }

  token(token, field = "token") {
    if (!token) {
      throw new GeneralError(this.__(REQUIRED, field), 400)
    }
  }

  async fileType(mimeType) {
    if (!mimeType || CONSTANTS.UPLOAD_PICTURE.ALLOWED_TYPE.indexOf(mimeType) === -1) {
      throw {
        message: MESSAGES.INVALID_FILE_TYPE,
        statusCode: 400
      };
    }
  }

  async fileSize(fileSize) {
    if (!fileSize
      || fileSize < CONSTANTS.PROFILE_PICTURE.MIN_SIZE
      || fileSize > CONSTANTS.PROFILE_PICTURE.MAX_SIZE) {
      throw {
        message: MESSAGES.INVALID_FILE_SIZE,
        statusCode: 400
      };
    }
  }

  name(name, key = 'name') {
    if (!name) {
      throw new GeneralError(this.__(REQUIRED, key), 400);
    }
  }

  category(category) {
    if (!category) {
      throw new GeneralError(this.__(REQUIRED, 'category'), 400);
    }

    if (!CONSTANTS.CATEGORY.includes(category)) {
      throw new GeneralError(this.__(INVALID, 'category'), 400);
    }
  }

  enable(enable, field) {
    if (enable === undefined) {
      throw new GeneralError(this.__(REQUIRED, field), 400);
    }
    if (_.toInteger(enable) !== 0 && _.toInteger(enable) !== 1) {
      throw new GeneralError(this.__(INVALID, field), 400);
    }
  }

  id(id, key = 'id') {
    if (!id) {
      throw new GeneralError(this.__(REQUIRED, key), 400);
    }
    if (!CONSTANTS.REGEX.UUID.test(id)) {
      throw new GeneralError(this.__(INVALID, key), 400);
    }
  }

  phoneNumber(phoneNumber, key = 'phoneNumber') {
    if (!phoneNumber) {
      throw new GeneralError(this.__(REQUIRED, key), 400);
    }
    if (!CONSTANTS.REGEX.MOBILE.test(phoneNumber)) {
      throw new GeneralError(this.__(INVALID, key), 400);
    }
  }

  dateOfBirth(date, key = 'dateOfBirth') {
    const dateFormat = MOMENT(date, 'YYYY-MM-DD', false);
    if (!date) {
      throw new GeneralError(this.__(REQUIRED, key), 400);
    }
    if (!dateFormat.isValid()) {
      throw new GeneralError(this.__(INVALID, key), 400);
    }
    if (MOMENT().diff(new Date(date), 'years', true) < 21) {
      throw new GeneralError(this.__('BELOW_AGE_LIMIT', key), 400);
    }
  }

  type(type) {
    if (!type) {
      throw new GeneralError(this.__(REQUIRED, 'ingredient_type'), 400);
    }

    if (!CONSTANTS.INGREDIENT_TYPE.TYPE.includes(type)) {
      throw new GeneralError(this.__(INVALID, 'ingredient_type'), 400);
    }
  }

  field(field, key) {
    if (!field) {
      throw new GeneralError(this.__(REQUIRED, key), 400);
    }
  }

  abv(abv) {
    if (abv === undefined) {
      throw new GeneralError(this.__(REQUIRED, 'abv'), 400);
    }
  }

  price(price, key) {
    if (price === undefined) {
      throw new GeneralError(this.__(REQUIRED, key), 400);
    }
    if (isNaN(parseFloat(price))) {
      throw new GeneralError(this.__(INVALID, key), 400);
    }
  }

  arrayUUID(arrayUUID, key) {
    if (!arrayUUID) {
      throw new GeneralError(this.__(REQUIRED, key), 400);
    }
    arrayUUID = JSON.parse(arrayUUID);
    if (!Array.isArray(arrayUUID) || !arrayUUID.length) {
      throw new GeneralError(this.__(INVALID, key), 400);
    }
    for (const ingredient of arrayUUID) {
      this.id(ingredient, key);
    }
  }

  flag(flag, field) {
    if (flag === undefined) {
      throw new GeneralError(this.__(REQUIRED, field), 400);
    }
    if (_.toInteger(flag) !== 0 && _.toInteger(flag) !== 1) {
      throw new GeneralError(this.__(INVALID, field), 400);
    }
  }


  quantity(quantity) {
    if (!quantity) {
      throw new GeneralError(this.__(REQUIRED, 'quantity'), 400);
    }
    if (isNaN(quantity)) {
      throw new GeneralError(this.__(INVALID, 'quantity'), 400);
    }
  }

  dateFormat(date, key, required) {
    const dateFormat = MOMENT(date, 'YYYY-MM-DD', required);
    if (!date) {
      throw new GeneralError(this.__(REQUIRED, key), 400);
    }
    if (!dateFormat.isValid()) {
      throw new GeneralError(this.__(INVALID, key), 400);
    }
  }

  startDateEndDate(start_date, end_date) {
    this.dateFormat(start_date, 'start_date', false);
    this.dateFormat(end_date, 'end_date', false);
    if (MOMENT(new Date(start_date)).isAfter(new Date(end_date))) {
      throw new GeneralError(this.__('INVALID_START_END_DATE'), 400);
    }
  }
}

module.exports = Validator
