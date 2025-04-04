const { v4: uuidv4 } = require("uuid")

class UserModel {
    constructor() {
        this.users = [
            {
                id: "1",
                name: "Test User",
                email: "test@example.com",
                password: "$2b$10$P/Mx7pUdbre0L92bBOGt..zPAyVlbFkRxszU6dw13b91LaG9WT7ny", // Password: "password"
                createdAt: new Date().toISOString(),
            },
            {
                id: "2",
                name: "Demo User",
                email: "demo@example.com",
                password: "$2b$10$XWos9FKzcpUYi3kyY/gY9edOpumHdPbV2zTeMRqwvjF00iENzREWS", // Password: "test123"
                createdAt: new Date().toISOString(),
            }
        ]
    }

    /**
     * Get all users
     */
    getAllUsers() {
        return [...this.users] // Return a copy to prevent direct modification
    }

    /**
     * Get a user by ID
     */
    getUserById(id) {
        return this.users.find((user) => user.id === id)
    }

    /**
     * Find a user by email
     */
    findUserByEmail(email) {
        return this.users.find((user) => user.email === email)
    }

    /**
     * Create a new user
     */
    createUser(userData) {
        const newUser = {
            id: uuidv4(),
            ...userData,
            createdAt: new Date().toISOString(),
        }
        
        this.users.push(newUser)
        return newUser
    }

    /**
     * Update a user
     */
    updateUser(id, userData) {
        const index = this.users.findIndex((user) => user.id === id)

        if (index === -1) {
            return false
        }

        this.users[index] = {
            ...this.users[index],
            ...userData,
            updatedAt: new Date().toISOString(),
        }

        return this.users[index]
    }

    /**
     * Delete a user
     */
    deleteUser(id) {
        const initialLength = this.users.length
        this.users = this.users.filter((user) => user.id !== id)

        return this.users.length < initialLength
    }
}

module.exports = UserModel

