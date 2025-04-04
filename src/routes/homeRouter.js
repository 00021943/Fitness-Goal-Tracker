const express = require("express")
const { ensureAuthenticated } = require("../middlewares/auth")

/**
 * Create and configure home routes
 * @param {HomeController} homeController - Home controller
 * @returns {Router} Express router
 */
function createHomeRouter(homeController) {
    const router = express.Router()

    // Public home page
    router.get("/", (req, res) => homeController.getHomePage(req, res))

    // Dashboard (protected)
    router.get("/dashboard", ensureAuthenticated, (req, res) => homeController.getDashboard(req, res))

    return router
}

module.exports = createHomeRouter

