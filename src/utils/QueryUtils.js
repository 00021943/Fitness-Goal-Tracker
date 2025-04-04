class QueryUtils {
    /**
     * Build a query string from filter parameters
     */
    buildQueryString(filters) {
        let queryString = ""

        if (filters.status && filters.status !== "all") {
            queryString += `status=${filters.status}&`
        }

        if (filters.type && filters.type !== "all") {
            queryString += `type=${filters.type}&`
        }

        if (filters.sort) {
            queryString += `sort=${filters.sort}&`
        }

        // Remove trailing & if present
        queryString = queryString.endsWith("&") ? queryString.slice(0, -1) : queryString

        return queryString ? `?${queryString}` : ""
    }
}

module.exports = QueryUtils

