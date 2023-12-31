const compression = require("compression")
const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
const authRoutes = require("./routes/authRoutes")
const ingredientRoutes = require("./routes/ingredientRoutes")
const ingredientItemRoutes = require("./routes/ingredientItemRoutes")
// const userRoutes = require('./routes/userRoutes');
const bodyParser = require("body-parser")
// const swaggerUi = require('swagger-ui-express');
// const swaggerDoc = require('swagger-jsdoc');
// const swaggerDef = require('./public/swagger');
const cors = require("cors")
const methodOverride = require("method-override")
const i18n = require("i18n")
// const morgan = require('morgan');
// const helmet = require('helmet');

global.CONSOLE_LOGGER = require("./util/logger")
global.CONSTANTS = require("./util/constants")
global.MESSAGES = require("./locales/en.json")
global.MOMENT = require("moment")
global._ = require("lodash")

if (process.env.LOCAL === "true") {
  app.use(express.static("../jsdocs/jsdocs"))
  app.use(
    "/auth/coverage",
    express.static(`${__dirname}/../coverage/lcov-report`)
  )
}

// Configure i18n for multilingual
i18n.configure({
  locales: ["en"],
  directory: `${__dirname}/locales`,
  extension: ".json",
  prefix: "",
  logDebugFn(msg) {
    if (process.env.LOCAL === "true") {
      CONSOLE_LOGGER.debug(`i18n::${CONSTANTS.LOG_LEVEL}`, msg)
    }
  }
})

app.use(compression())
// app.use(helmet());
app.use(i18n.init)
app.use(cookieParser())

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use(bodyParser.json({ limit: "50mb", extended: true }))

app.use(
  cors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: ["x-auth-token"]
  })
)

// app.use(morgan('dev'));
app.use(methodOverride())

// Landing Page
app.get("/", (req, res) => {
  res.send({
    status: "ok",
    date: MOMENT()
  })
})
app.use("/auth", authRoutes)
app.use("/ingredient", ingredientRoutes)
app.use("/ingredient-item", ingredientItemRoutes)
// app.use('/user', userRoutes);

// const spec = swaggerDoc(swaggerDef);

// if (process.env.NODE_ENV !== 'production') {
//     app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(spec));
// }

module.exports = app
