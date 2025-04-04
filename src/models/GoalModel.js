const { v4: uuidv4 } = require("uuid")

class GoalModel {
  constructor() {
    this.goals = [
      {
        id: "1",
        userId: "1", // Belongs to test user
        title: "Lose Weight",
        type: "weight",
        currentValue: 80,
        startValue: 85,
        target: 70,
        unit: "kg",
        deadline: "2023-12-31",
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
      },
      {
        id: "2",
        userId: "1", // Belongs to test user
        title: "Run a Marathon",
        type: "running",
        currentValue: 15,
        startValue: 5,
        target: 42,
        unit: "km",
        deadline: "2023-11-15",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      },
      {
        id: "3",
        userId: "1", // Belongs to test user
        title: "Increase Bench Press",
        type: "strength",
        currentValue: 60,
        startValue: 40,
        target: 100,
        unit: "kg",
        deadline: "2023-10-01",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      },
      // Add goals for demo user
      {
        id: "4",
        userId: "2", // Belongs to demo user
        title: "Improve Flexibility",
        type: "other",
        currentValue: 3,
        startValue: 1,
        target: 5,
        unit: "level",
        deadline: "2023-12-15",
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      },
      {
        id: "5",
        userId: "2", // Belongs to demo user
        title: "Swimming",
        type: "other",
        currentValue: 500,
        startValue: 200,
        target: 1000,
        unit: "m",
        deadline: "2023-11-30",
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
      },
    ]
  }

  /**
   * Get all goals
   */
  getAllGoals() {
    return [...this.goals] // Return a copy to prevent direct modification
  }

  /**
   * Get goals by user ID
   */
  getGoalsByUserId(userId) {
    return this.goals.filter((goal) => goal.userId === userId)
  }

  /**
   * Get a goal by ID
   */
  getGoalById(id) {
    return this.goals.find((goal) => goal.id === id)
  }

  /**
   * Create a new goal
   */
  createGoal(goalData) {
    const newGoal = {
      id: uuidv4(),
      ...goalData,
      createdAt: new Date().toISOString(),
    }

    this.goals.push(newGoal)
    return newGoal
  }

  /**
   * Update a goal
   */
  updateGoal(id, goalData) {
    const index = this.goals.findIndex((goal) => goal.id === id)

    if (index === -1) {
      return false
    }

    this.goals[index] = {
      ...this.goals[index],
      ...goalData,
      updatedAt: new Date().toISOString(),
    }

    return this.goals[index]
  }

  /**
   * Delete a goal
   */
  deleteGoal(id) {
    const initialLength = this.goals.length
    this.goals = this.goals.filter((goal) => goal.id !== id)

    return this.goals.length < initialLength
  }
}

module.exports = GoalModel

