class Logger {
  static debug() {
    console.log.apply(null, arguments)
  }

  static info() {
    if (arguments.length) {
      console.info.apply(MOMENT()._d, arguments)
    }
  }

  static error() {
    console.error.apply(null, arguments)
  }
}

module.exports = Logger
