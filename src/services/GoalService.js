class GoalService {
    constructor(goalModel, dateUtils) {
        this.goalModel = goalModel
        this.dateUtils = dateUtils
    }

    /**
     * Get dashboard statistics for a user
     * @param {string} userId - User ID
     */
    getDashboardStats(userId) {
        const goals = this.goalModel.getGoalsByUserId(userId)
        const goalsWithProgress = goals.map((goal) => ({
            ...goal,
            progress: this.calculateProgress(goal),
        }))

        const totalGoals = goals.length
        const completedGoals = goalsWithProgress.filter((goal) => goal.progress === 100).length
        const inProgressGoals = totalGoals - completedGoals

        // Calculate average progress
        const averageProgress =
            goalsWithProgress.length > 0
                ? Math.round(goalsWithProgress.reduce((sum, goal) => sum + goal.progress, 0) / goalsWithProgress.length)
                : 0

        // Count goals by type
        const goalsByType = {
            weight: goalsWithProgress.filter((goal) => goal.type === "weight").length,
            running: goalsWithProgress.filter((goal) => goal.type === "running").length,
            strength: goalsWithProgress.filter((goal) => goal.type === "strength").length,
            other: goalsWithProgress.filter((goal) => goal.type === "other").length,
        }

        // Get recent goals (last 3)
        const recentGoals = [...goalsWithProgress].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3)

        // Count approaching deadlines
        const approachingDeadlines = goalsWithProgress.filter(
            (goal) => goal.progress < 100 && this.dateUtils.isDeadlineApproaching(goal.deadline),
        ).length

        return {
            totalGoals,
            completedGoals,
            inProgressGoals,
            averageProgress,
            goalsByType,
            recentGoals,
            approachingDeadlines,
        }
    }

    /**
     * Get goals with filtering and sorting for a user
     * @param {string} userId - User ID
     * @param {string} status - Filter by status
     * @param {string} type - Filter by type
     * @param {string} sort - Sort order
     */
    getFilteredGoals(userId, status, type, sort = "newest") {
        let goals = this.goalModel.getGoalsByUserId(userId)

        // Add progress and deadline status
        goals = goals.map((goal) => ({
            ...goal,
            progress: this.calculateProgress(goal),
            deadlineApproaching: this.dateUtils.isDeadlineApproaching(goal.deadline),
            deadlinePassed: this.dateUtils.isDeadlinePassed(goal.deadline),
        }))

        // Apply filters
        if (status === "completed") {
            goals = goals.filter((goal) => goal.progress === 100)
        } else if (status === "in-progress") {
            goals = goals.filter((goal) => goal.progress < 100)
        }

        if (type && type !== "all") {
            goals = goals.filter((goal) => goal.type === type)
        }

        // Apply sorting
        if (sort === "newest") {
            goals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        } else if (sort === "oldest") {
            goals.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        } else if (sort === "most-progress") {
            goals.sort((a, b) => b.progress - a.progress)
        } else if (sort === "least-progress") {
            goals.sort((a, b) => a.progress - b.progress)
        } else if (sort === "deadline-soon") {
            goals.sort((a, b) => {
                // Put goals without deadlines at the end
                if (!a.deadline && !b.deadline) return 0
                if (!a.deadline) return 1
                if (!b.deadline) return -1

                // Sort by deadline date (ascending - soonest first)
                return new Date(b.deadline) - new Date(a.deadline)
            })
        }

        return goals
    }

    /**
     * Get a goal by ID
     */
    getGoalById(id) {
        return this.goalModel.getGoalById(id)
    }

    /**
     * Create a new goal
     */
    createGoal(goalData) {
        return this.goalModel.createGoal(goalData)
    }

    /**
     * Update a goal
     */
    updateGoal(id, goalData) {
        return this.goalModel.updateGoal(id, goalData)
    }

    /**
     * Delete a goal
     */
    deleteGoal(id) {
        return this.goalModel.deleteGoal(id)
    }

    /**
     * Calculate progress percentage for a goal
     */
    calculateProgress(goal) {
        if (goal.type === "weight" && goal.target < goal.currentValue) {
            // For weight loss, reverse the calculation
            const totalLoss = goal.startValue - goal.target
            const currentLoss = goal.startValue - goal.currentValue
            return Math.min(Math.round((currentLoss / totalLoss) * 100), 100)
        } else if (goal.type !== "weight" && goal.target > goal.currentValue) {
            // For goals where we want to increase (running distance, etc.)
            return Math.min(Math.round((goal.currentValue / goal.target) * 100), 100)
        }
        return 100 // Goal achieved
    }
}

module.exports = GoalService

