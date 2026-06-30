# Full-Stack Fitness E-commerce App

A full-stack fitness e-commerce application built with Node.js, Express, and SQLite.

This project is part of my software engineering portfolio and is designed to strengthen my skills in backend development, RESTful routing, database integration, authentication, and full-stack application structure.

---

## Status

This project is currently in active development.

The backend foundation, routing structure, middleware, and database setup are in place, and additional e-commerce functionality is being added over time.

---

## Overview

The goal of this project is to build a fitness-themed online store where users can browse products, create accounts, and interact with a custom backend application.

This project is being built to demonstrate practical experience with:

- Express routing and middleware
- Environment-based configuration
- SQLite database integration
- Authentication with JWT
- Structuring a real-world full-stack application

---

## Current Features

- Express server setup
- Organized route structure
- SQLite integration with `better-sqlite3`
- Environment variable support with `dotenv`
- Middleware support with `cors`
- Authentication-related packages installed for future implementation

---

## Tech Stack

- Node.js
- Express
- SQLite (`better-sqlite3`)
- HTML
- CSS
- JavaScript
- dotenv
- cors
- bcryptjs
- jsonwebtoken

---

## Installation

```bash
git clone https://github.com/Patrickm311/fullstack-ecommerce-app.git
cd fullstack-ecommerce-app
npm install
```

---

## Environment Variables

Create a `.env` file in the root of the project and add any required environment variables.

Example:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_here
```
---

## Running the App

```bash
npm start
```

The server starts from:

- `src/server.js`

Then open your browser and visit:

- `http://localhost:3000`

---

## Project Structure

```text
fullstack-ecommerce-app/
├── public/              # Static frontend files
├── src/                 # Server, routes, middleware, config, and database logic
├── .gitignore
├── package.json
├── package-lock.json
```

---

## Current Focus

- Expanding backend API routes
- Connecting product and user data to SQLite
- Improving frontend product display
- Strengthening the overall full-stack architecture

---

## Planned Features

- User registration and login
- JWT-based authentication
- Shopping cart functionality
- Checkout flow
- Admin tools for product management
- Search and product filtering
- Improved responsive design
- Deployment for live demo access

---

## What I'm Learning

This project is helping me strengthen my understanding of:

- Backend application architecture
- Express routing and middleware patterns
- Database integration with SQLite
- Authentication workflows
- Building full-stack portfolio projects with scalable structure

---

## Author

**Patrick McLaughlin**
