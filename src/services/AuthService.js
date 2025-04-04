const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

class AuthService {
    constructor(userModel) {
        this.userModel = userModel
    }

    /**
     * Register a new user
     * @param {string} name - User's name
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @returns {Promise<Object>} - Created user object
     */
    async registerUser(name, email, password) {
        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create user
        const user = this.userModel.createUser({
            name,
            email,
            password: hashedPassword,
        })

        return user
    }

    /**
     * Find a user by email
     * @param {string} email - User's email
     * @returns {Promise<Object|null>} - User object or null
     */
    async findUserByEmail(email) {
        return this.userModel.findUserByEmail(email)
    }

    /**
     * Authenticate a user
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @returns {Promise<Object|null>} - User object or null
     */
    async authenticateUser(email, password) {
        // Find user by email
        const user = await this.findUserByEmail(email)

        if (!user) {
            return null
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return null
        }

        return user
    }

    /**
     * Generate JWT token for user
     * @param {Object} user - User object
     * @returns {string} - JWT token
     */
    generateToken(user) {
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        return jwt.sign(payload, process.env.JWT_SECRET || "your-jwt-secret", { expiresIn: "1d" })
    }

    /**
     * Verify JWT token
     * @param {string} token - JWT token
     * @returns {Object|null} - Decoded token payload or null
     */
    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET || "your-jwt-secret")
        } catch (error) {
            return null
        }
    }
}

module.exports = AuthService

