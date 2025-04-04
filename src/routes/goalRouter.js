const express = require("express")
const { ensureAuthenticated } = require("../middlewares/auth")

/**
 * Create and configure goal routes
 * @param {GoalController} goalController - Goal controller
 * @returns {Router} Express router
 */
function createGoalRouter(goalController) {
    const router = express.Router()

    // Protect all goal routes
    router.use(ensureAuthenticated)

    // Goals listing with filtering
    router.get("/", (req, res) => goalController.getGoals(req, res))

    // Show form to create a new goal
    router.get("/new", (req, res) => goalController.getNewGoalForm(req, res))

    // Create a new goal
    router.post("/", (req, res) => goalController.createGoal(req, res))

    // Show form to edit a goal
    router.get("/:id/edit", (req, res) => goalController.getEditGoalForm(req, res))

    // Update a goal
    router.put("/:id", (req, res) => goalController.updateGoal(req, res))

    // Delete a goal
    router.delete("/:id", (req, res) => goalController.deleteGoal(req, res))

    return router
}

module.exports = createGoalRouter

