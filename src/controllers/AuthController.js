class AuthController {
    constructor(authService) {
        this.authService = authService
    }

    /**
     * Render registration form
     */
    getRegisterForm(req, res) {
        if (req.user) {
            return res.redirect("/dashboard")
        }
        res.render("auth/register", { formData: {} })
    }

    /**
     * Handle user registration
     */
    async register(req, res) {
        try {
            const { name, email, password, confirmPassword } = req.body
            const formData = { name, email }

            // Validate input
            if (!name || !email || !password) {
                res.setMessage("error", "All fields are required")
                return res.render("auth/register", { formData })
            }

            if (password !== confirmPassword) {
                res.setMessage("error", "Passwords do not match")
                return res.render("auth/register", { formData })
            }

            // Check if user already exists
            const existingUser = await this.authService.findUserByEmail(email)
            if (existingUser) {
                res.setMessage("error", "User with this email already exists")
                return res.render("auth/register", { formData })
            }

            // Create user
            const user = await this.authService.registerUser(name, email, password)

            // Generate JWT token
            const token = this.authService.generateToken(user)

            // Set token in cookie
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                secure: process.env.NODE_ENV === "production",
            })

            res.setMessage("success", "Registration successful! Welcome!")
            res.redirect("/dashboard")
        } catch (error) {
            console.error("Registration error:", error)
            res.setMessage("error", "Error during registration. Please try again.")
            res.render("auth/register", { formData: req.body })
        }
    }

    /**
     * Render login form
     */
    getLoginForm(req, res) {
        if (req.user) {
            return res.redirect("/dashboard")
        }
        res.render("auth/login", { formData: {} })
    }

    /**
     * Handle user login
     */
    async login(req, res) {
        try {
            const { email, password } = req.body
            const formData = { email }

            // Validate input
            if (!email || !password) {
                res.setMessage("error", "Please enter email and password")
                return res.render("auth/login", { formData })
            }

            // Authenticate user
            const user = await this.authService.authenticateUser(email, password)

            if (!user) {
                res.setMessage("error", "Invalid email or password")
                return res.render("auth/login", { formData })
            }

            // Generate JWT token
            const token = this.authService.generateToken(user)

            // Set token in cookie
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                secure: false,
            })

            res.setMessage("success", "Login successful!")
            res.redirect("/dashboard")
        } catch (error) {
            console.error("Login error:", error)
            res.setMessage("error", "Error during login. Please try again.")
            res.render("auth/login", { formData: req.body })
        }
    }

    /**
     * Handle user logout
     */
    logout(req, res) {
        // Clear token cookie
        res.clearCookie("token")

        res.setMessage("success", "You have been successfully logged out")
        res.redirect("/")
    }
}

module.exports = AuthController

