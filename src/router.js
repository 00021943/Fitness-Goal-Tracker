const authRouter = require("./routes/authRouter")
const homeRouter = require("./routes/homeRouter");
const goalRouter = require("./routes/goalRouter");


// Initialize services, models, controllers
const UserModel = require("./models/UserModel")
const GoalModel = require("./models/GoalModel")
const DateUtils = require("./utils/DateUtils")
const QueryUtils = require("./utils/QueryUtils")
const AuthService = require("./services/AuthService")
const GoalService = require("./services/GoalService")
const AuthController = require("./controllers/AuthController")
const HomeController = require("./controllers/HomeController")
const GoalController = require("./controllers/GoalController")

const userModel = new UserModel()
const goalModel = new GoalModel()
const dateUtils = new DateUtils()
const queryUtils = new QueryUtils()
const authService = new AuthService(userModel)
const goalService = new GoalService(goalModel, dateUtils)
const authController = new AuthController(authService)
const homeController = new HomeController(goalService, dateUtils)
const goalController = new GoalController(goalService, dateUtils, queryUtils)

/**
 * Register all application routes
 * @param {Express} app - Express application
 * @param {AuthController} authController - Auth controller
 * @param {HomeController} homeController - Home controller
 * @param {GoalController} goalController - Goal controller
 */
function registerRoutes(app) {
  // Register auth routes
  app.use("/auth", authRouter(authController))

  // Register home routes
  app.use("/", homeRouter(homeController))

  // Register goal routes
  app.use("/goals", goalRouter(goalController))
}

module.exports = { registerRoutes };
