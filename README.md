# Fitness Goal Tracker

## About the Application

Fitness Goal Tracker is a web application that helps users track and manage their fitness goals. Users can create different types of fitness goals (weight loss/gain, running distance, strength training, etc.), monitor their progress, and set deadlines.

**Note: This web application was created to fulfill Web Technology module's requirements and does not represent an actual company or service.**

## Links

- GitHub Repository: [https://github.com/00021943/Fitness-Goal-Tracker](https://github.com/00021943/Fitness-Goal-Tracker)
- Hosted Application: [https://ozod-fitness.bytogo.uz/](https://ozod-fitness.bytogo.uz/)

## How to Run the Application Locally

### Prerequisites

Before running the application, make sure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Step-by-Step Installation Instructions

1. **Clone the repository**

   Open your terminal/command prompt and run:

   ```bash
   git clone https://github.com/00021943/Fitness-Goal-Tracker.git
   ```

2. **Navigate to the project directory**

   After cloning the repository, navigate to the project directory:

   ```bash
   cd Fitness-Goal-Tracker
   ```

3. **Install dependencies**

   Once inside the project directory, install all the required dependencies by running:

   ```bash
   npm install
   ```

4. **Create environment variables file**

   You need to create a `.env` file in the root directory of the project to store your environment variables. You can use the following content from the `.env-example` file:

   ```plaintext
   PORT=3001
   JWT_SECRET=secret
   NODE_ENV=production | dev
   ```

5. **Start the application for development**

   For development purposes, run the application with `node-dev` using the following command:

   ```bash
   npm run dev
   ```

   This will start the application in development mode with automatic reload on code changes.

6. **Run the application with Docker (for production)**

   If you prefer running the app using **Docker**, follow these steps:

   - **Build the Docker image**:
   
     ```bash
     docker-compose build
     ```

   - **Start the application**:
   
     ```bash
     docker-compose up
     ```

7. **Access the application**

   After starting the application, open your web browser and navigate to the following URL to access the application:

   [http://localhost:3001](http://localhost:3001)

   You should see the homepage of the application.

8. **Test accounts**

   You can use the following test accounts to log in and explore the application:
   - **Email:** test@example.com, **Password:** password
   - **Email:** demo@example.com, **Password:** test123

## Application Dependencies

The application uses the following dependencies:

### Main Dependencies

- **bcryptjs (v3.0.2)**
  - Purpose: Library for hashing and comparing passwords
  - Usage: Secures user passwords in the database

- **cookie-parser (v1.4.7)**
  - Purpose: Parses cookies attached to the client request
  - Usage: Manages user authentication tokens stored in cookies

- **dotenv (v16.4.7)**
  - Purpose: Loads environment variables from `.env` file
  - Usage: Manages configuration settings like port and JWT secret

- **ejs (v3.1.10)**
  - Purpose: Embedded JavaScript templating engine
  - Usage: Renders dynamic HTML views

- **express (v4.21.2)**
  - Purpose: Web application framework for Node.js
  - Usage: Handles HTTP requests, routing, and middleware

- **jsonwebtoken (v9.0.2)**
  - Purpose: Implementation of JSON Web Tokens
  - Usage: Creates and verifies authentication tokens

- **method-override (v3.0.0)**
  - Purpose: Lets you use HTTP verbs like PUT or DELETE
  - Usage: Enables RESTful API methods in forms

- **uuid (v11.1.0)**
  - Purpose: Generates unique identifiers
  - Usage: Creates unique IDs for goals and users

### Development Dependencies

- **node-dev (v8.0.0)**
  - Purpose: Monitors for changes and automatically restarts the server
  - Usage: Improves development workflow

## Project Structure

```plaintext
fitness-goal-tracker/
├── public/               # Static files (CSS, client-side JS)
├── src/                  # Source code
│   ├── app.js            # Application entry point
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Express middleware
│   ├── models/           # Data models
│   ├── routes/           # Route definitions
│   ├── services/         # Business logic
│   └── utils/            # Utility functions
├── views/                # EJS templates
├── .env                  # Environment variables
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## Features

- **User Authentication** (register, login, logout): Allows users to create an account, log in, and log out.
- **Dashboard with Goal Statistics**: Displays key statistics for the user's fitness goals.
- **Goal Creation, Editing, and Deletion**: Users can create, modify, and remove fitness goals.
- **Progress Tracking with Visual Indicators**: Users can track their progress toward goals with visual indicators such as charts and percentages.
- **Filtering and Sorting Goals by Various Criteria**: Users can filter and sort their goals by deadlines, types, and statuses.
- **Deadline Management with Notifications**: Sends notifications to users when deadlines are approaching for their goals.

## License

This project is created for educational purposes as part of the Web Technology module and is not associated with any real business or service.

## Additional Information

For further information, or if you encounter any issues, feel free to open an issue on the GitHub repository or reach out via email.

### Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit pull requests. Please follow the standard contribution process:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request with a description of the changes.

Thank you for checking out this project!