const express = require("express")

/**
 * Create and configure auth routes
 * @param {AuthController} authController - Auth controller
 * @returns {Router} Express router
 */
function createAuthRouter(authController) {
    const router = express.Router()

    // Registration
    router.get("/register", (req, res) => authController.getRegisterForm(req, res))
    router.post("/register", (req, res) => authController.register(req, res))

    // Login
    router.get("/login", (req, res) => authController.getLoginForm(req, res))
    router.post("/login", (req, res) => authController.login(req, res))

    // Logout
    router.get("/logout", (req, res) => authController.logout(req, res))

    return router
}

module.exports = createAuthRouter

