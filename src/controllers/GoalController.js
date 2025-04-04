class GoalController {
    constructor(goalService, dateUtils, queryUtils) {
        this.goalService = goalService
        this.dateUtils = dateUtils
        this.queryUtils = queryUtils
    }

    getGoals(req, res) {
        const userId = req.user.id

        // Get filter parameters
        const { status, type, sort = "newest" } = req.query

        // Get goals with filters and sorting applied
        const goals = this.goalService.getFilteredGoals(userId, status, type, sort)

        res.render("goals/index", {
            goals,
            filters: { status, type, sort },
            formatDate: this.dateUtils.formatDate.bind(this.dateUtils),
        })
    }

    getNewGoalForm(req, res) {
        // Get today's date in YYYY-MM-DD format for the default deadline value
        const today = new Date().toISOString().split("T")[0]
        res.render("goals/new", { today, formData: {} })
    }

    createGoal(req, res) {
        const userId = req.user.id
        const { title, type, currentValue, startValue, target, unit, deadline } = req.body

        try {
            this.goalService.createGoal({
                userId,
                title,
                type,
                currentValue: Number.parseFloat(currentValue),
                startValue: startValue ? Number.parseFloat(startValue) : Number.parseFloat(currentValue),
                target: Number.parseFloat(target),
                unit,
                deadline: deadline || null,
            })

            res.setMessage("success", "Goal created successfully!")
            res.redirect("/goals")
        } catch (error) {
            res.setMessage("error", "Error creating goal")
            res.render("goals/new", {
                today: new Date().toISOString().split("T")[0],
                formData: req.body,
            })
        }
    }

    getEditGoalForm(req, res) {
        const userId = req.user.id
        const goalId = req.params.id

        const goal = this.goalService.getGoalById(goalId)

        if (!goal) {
            res.setMessage("error", "Goal not found")
            return res.redirect("/goals")
        }

        // Check if the goal belongs to the user
        if (goal.userId !== userId) {
            res.setMessage("error", "You do not have access to this goal")
            return res.redirect("/goals")
        }

        // Pass the current filters to the edit form
        const { status, type, sort } = req.query

        res.render("goals/edit", {
            goal,
            filters: { status, type, sort },
            formData: goal,
        })
    }

    updateGoal(req, res) {
        const userId = req.user.id
        const goalId = req.params.id
        const { title, type, currentValue, target, unit, deadline } = req.body

        // Check if the goal belongs to the user
        const goal = this.goalService.getGoalById(goalId)
        if (!goal || goal.userId !== userId) {
            res.setMessage("error", "You do not have access to this goal")
            return res.redirect("/goals")
        }

        try {
            const updated = this.goalService.updateGoal(goalId, {
                title,
                type,
                currentValue: Number.parseFloat(currentValue),
                target: Number.parseFloat(target),
                unit,
                deadline: deadline || null,
            })

            if (!updated) {
                res.setMessage("error", "Failed to update goal")
                return res.redirect("/goals")
            }

            // Preserve query parameters
            const { status, type: filterType, sort } = req.query
            let redirectUrl = "/goals"

            const queryString = this.queryUtils.buildQueryString({ status, type: filterType, sort })
            if (queryString) {
                redirectUrl += queryString
            }

            res.setMessage("success", "Goal updated successfully!")
            res.redirect(redirectUrl)
        } catch (error) {
            res.setMessage("error", "Error updating goal")
            res.render("goals/edit", {
                goal,
                filters: { status: req.query.status, type: req.query.type, sort: req.query.sort },
                formData: req.body,
            })
        }
    }

    deleteGoal(req, res) {
        const userId = req.user.id
        const goalId = req.params.id

        // Check if the goal belongs to the user
        const goal = this.goalService.getGoalById(goalId)
        if (!goal || goal.userId !== userId) {
            res.setMessage("error", "You do not have access to this goal")
            return res.redirect("/goals")
        }

        this.goalService.deleteGoal(goalId)

        // Preserve query parameters
        const { status, type, sort } = req.query
        let redirectUrl = "/goals"

        const queryString = this.queryUtils.buildQueryString({ status, type, sort })
        if (queryString) {
            redirectUrl += queryString
        }

        res.setMessage("success", "Goal deleted successfully!")
        res.redirect(redirectUrl)
    }
}

module.exports = GoalController

