require('dotenv').config();

const express = require('express');
const path = require('path');
const methodOverride = require("method-override")
const cookieParser = require("cookie-parser")

const { log } = require("./middlewares/logger")
const { registerRoutes } = require("./router")
const { authMiddleware } = require("./middlewares/auth")
const { messageHandlerMiddleware } = require("./middlewares/message")

const port = process.env.PORT || 3000

// Function to set up Middlewares
function setupMiddlewares(app) {
    app.use(express.static(path.join(__dirname, "..", "public")));
    app.use(express.urlencoded({ extended: true }))
    app.use(methodOverride("_method"))
    app.use(express.json());
    app.use(cookieParser())
    app.use(authMiddleware)
    app.use(messageHandlerMiddleware)
    app.use(log)
}

// Function to set up EJS
function setupTemplateEngine(app) {
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
}

// Function to set up routes
function setupRoutes(app) {
    // Main routes
    registerRoutes(app)

    // Handle unmatched routes
    app.all("*", (req, res, next) => {
        res.status(404).send('Route not found');
    });
}

// Function to start the application
function startApp() {
    try {
        const app = express();
        setupMiddlewares(app)
        setupRoutes(app);
        setupTemplateEngine(app);

        app.listen(port, () => {
            console.log(`Fitness Goal Tracker app listening at http://localhost:${port}`)
        })


    } catch (error) {
        console.error("Failed to start application", error);
        process.exit(1); // Exit with an error code
    }
}

// Start the application
startApp();
