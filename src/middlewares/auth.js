const jwt = require("jsonwebtoken")

/**
 * Make user available in all views
 */
function authMiddleware(req, res, next) {
  // Get token from cookie
  const token = req.cookies.token

  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Set user in request
      req.user = decoded

      // Make user available in views
      res.locals.user = decoded
      res.locals.isAuthenticated = true
    } catch (error) {
      // Invalid token
      res.locals.user = null
      res.locals.isAuthenticated = false
    }
  } else {
    // No token
    res.locals.user = null
    res.locals.isAuthenticated = false
  }

  next()
}

/**
 * Ensure user is authenticated
 */
function ensureAuthenticated(req, res, next) {
  if (req.user) {
    return next()
  }

  res.setMessage("error", "Please log in to access this page")
  res.redirect("/auth/login")
}

module.exports = { authMiddleware, ensureAuthenticated }

