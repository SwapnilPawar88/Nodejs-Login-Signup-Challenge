# Nodejs-Login-Signup-Challenge

# User Authentication System

This project is a Node.js application that provides user authentication using Express and Supabase. It includes APIs for user sign-up and sign-in.

## Features

- User registration with hashed passwords
- User login with authentication
- Supabase as the database
- RESTful API using Express

## Prerequisites

- Node.js and npm installed
- A GitHub account
- A Supabase account with a new project created

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/your-repository.git
   cd your-repository

2. Install dependencies:
    npm install

3. Set up environment variables:
    - Create a .env file in the root of your project with the following content:
    SUPABASE_URL=your-supabase-url
    SUPABASE_KEY=your-supabase-key
    PORT=3000

4. Run the application:
    - node app.js


5. Test the APIs:
    - POST /api/signup
    - POST /api/signin
