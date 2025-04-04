class DateUtils {
    /**
     * Format a date string to a human-readable format
     */
    formatDate(dateString) {
        const options = { year: "numeric", month: "short", day: "numeric" }
        return new Date(dateString).toLocaleDateString("en-US", options)
    }

    /**
     * Check if a deadline is approaching (within 7 days)
     */
    isDeadlineApproaching(deadline) {
        if (!deadline) return false

        const deadlineDate = new Date(deadline)
        const today = new Date()
        const diffTime = deadlineDate - today
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        return diffDays > 0 && diffDays <= 7
    }

    /**
     * Check if a deadline has passed
     */
    isDeadlinePassed(deadline) {
        if (!deadline) return false

        const deadlineDate = new Date(deadline)
        const today = new Date()

        return deadlineDate < today
    }
}

module.exports = DateUtils

