# Kabban-Board-Management

A full-stack Kanban board application with JWT authentication, allowing users to manage and organize tasks efficiently.

![Kanban Board Screenshot](./assets/screenshot.png)

[View Live Demo](https://my-kanban-board.onrender.com)


## Features

- **Secure Authentication**
  - JWT-based user authentication
  - Protected routes
  - Session management

- **Task Management**
  - Create, read, update, and delete tickets
  - Organize tickets in three columns: Todo, In Progress, Done
  - Assign tickets to users

- **Filtering & Sorting**
  - Filter tickets by status
  - Filter tickets by assigned user
  - Sort tickets by name or assignee

## Technologies Used

### Frontend

- React
- TypeScript
- CSS
- React Router DOM

### Backend

- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- JSON Web Tokens (JWT)
- bcryptjs

## Installation

1. Clone the repository:

```bash
git clone [https://github.com/yourusername/kanban-board-management.git]
cd kanban-board-management
```

2. Install dependencies:

```bash
npm install
cd client && npm install
cd ../server && npm install
```

3. Create a `.env` file in the server directory:

```
DB_NAME='kanban_db'
DB_USER='your_postgres_username'
DB_PASSWORD='your_postgres_password'
JWT_SECRET_KEY='your_secret_key'
```

4. Create the database:

```bash
cd server
psql -U postgres -f db/schema.sql
```

5. Seed the database:

```bash
npm run seed
```

## Running the Application

1. Start the development server:

```bash
# From the root directory
npm run server:dev
```

2. Start the client:

```bash
# In a new terminal
npm run client:dev
```

3. Access the application at [http://localhost:3000]

## Default Users

The seed data includes the following users:
- Username: JollyGuru, Password: password
- Username: SunnyScribe, Password: password
- Username: RadiantComet, Password: password

## API Endpoints

### Authentication

- POST `/auth/login` - Login user

### Users

- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get user by ID
- POST `/api/users` - Create new user
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user

### Tickets

- GET `/api/tickets` - Get all tickets
- GET `/api/tickets/:id` - Get ticket by ID
- POST `/api/tickets` - Create new ticket
- PUT `/api/tickets/:id` - Update ticket
- DELETE `/api/tickets/:id` - Delete ticket

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
