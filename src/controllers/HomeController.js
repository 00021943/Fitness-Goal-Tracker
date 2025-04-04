class HomeController {
    constructor(goalService, dateUtils) {
        this.goalService = goalService
        this.dateUtils = dateUtils
    }

    /**
     * Render public home page
     */
    getHomePage(req, res) {
        res.render("home/landing")
    }

    /**
     * Render dashboard (authenticated users only)
     */
    getDashboard(req, res) {
        const userId = req.user.id
        const stats = this.goalService.getDashboardStats(userId)

        res.render("home/dashboard", {
            stats,
            formatDate: this.dateUtils.formatDate.bind(this.dateUtils),
            isDeadlineApproaching: this.dateUtils.isDeadlineApproaching.bind(this.dateUtils),
        })
    }
}

module.exports = HomeController

