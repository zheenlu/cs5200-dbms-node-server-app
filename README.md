# Backend for cs5200 dbms final project

This guide will walk you through setting up the backend for our project.

## Requirements

- Node.js
- npm 
- express
- cors
- mysql2
- nodemon (optional, but recommended for automatic server restarts)

## Installation Steps
1. **Clone the Repository**
   - Clone this repository to your local machine using `git clone https://github.com/zheenlu/cs5200-dbms-node-server-app.git`.

2. **Start the Database**

3. **Start the Server**
   - To start the server, you can use either of the following commands:
     - `nodemon app.js` for automatic restarts upon file changes (recommended if you have nodemon installed).
     - `node app.js` for a standard start-up.

   - By default, the server will run on `localhost:4000`.

## API Routes

Access the backend services via the following routes:
- **Find All Users**: Access a list of all users at `GET localhost:4000/users`.
- **Find User by ID**: Retrieve a specific user by their ID at `GET localhost:4000/users/:id`.
- **Find User's Goals by ID**: Retrieve a specific user by their ID at `GET localhost:4000/users/:id/goals`.