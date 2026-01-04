# Full-Stack Intern Assessment – Sports

A mini full-stack platform inspired by real-world sports betting and casino applications.  
This project focuses on authentication, listing games or matches, filtering, managing favorites, and global state management using Redux Toolkit — without involving real money or betting logic.

## Demo Link

Visit the website: [BitBet](https://bit-bet-client.vercel.app)

## Problem Statement

Build a Mini Sports Games Platform where users can:

- Register and log in securely
- View a list of sports matches games
- Filter games/matches
- Mark and manage favorites

## Core Features

### 1. User Authentication

- Register using Name, Email, and Password
- Login using Email and Password
- Passwords are securely hashed
- JWT-based authentication
- Only authenticated users can access games/matches
- Auth state managed using Redux Toolkit

---

### 2. List Matches / Games

#### Sports Match Fields

- Match ID
- Sport (Cricket, Football, Tennis)
- League (IPL, EPL, La Liga, etc.)
- Teams (Team A vs Team B)
- Start Time

---

### 3. Filter Functionality

Users can filter games/matches by:

- Sport (Cricket, Football, etc.)

Filtering UI can be implemented using:

- Tabs

## Tech Stack

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- RESTful APIs
- Bcryptjs (For Password Hashing)

### Frontend

- React
- Redux Toolkit
- React Redux
- Tailwind
- Axios

---

## State Management (Redux Toolkit)

Redux Toolkit is used for managing:

- Authentication state
- User data
- matches list
- Favorites

Example slices:

- `authSlice`

---

## API List

### Authentication APIs

| Method | Endpoint           | Description                     | Auth Required |
| ------ | ------------------ | ------------------------------- | ------------- | --- |
| POST   | /api/auth/register | Register a new user             | No            |
| POST   | /api/auth/login    | Login user and return JWT token | No            |
| POST   | /api/auth/logout   | User logout                     | No            | No  |

---

### Games / Matches APIs

| Method | Endpoint                | Description                             | Auth Required |
| ------ | ----------------------- | --------------------------------------- | ------------- |
| GET    | /api/games              | Get all games / matches                 | Yes           |
| GET    | /api/games?filter=value | Get games filtered by sport or provider | Yes           |

---

### Favorites APIs

| Method | Endpoint               | Description                        | Auth Required |
| ------ | ---------------------- | ---------------------------------- | ------------- |
| POST   | /api/favorites/:gameId | Add a game/match to favorites      | Yes           |
| DELETE | /api/favorites/:gameId | Remove a game/match from favorites | Yes           |
| GET    | /api/favorites         | Get all favorite games/matches     | Yes           |

---

### Authorization

- All protected APIs require a JWT token

## 📝 Quick Start

To run the app locally we need clone the app

### Environment Variables

Create a `.env` file in the `client` folder using the example below:

- `VITE_BACKEND_URL`

Create a `.env` file in the `server` folder using the example below:

- `PORT`
- `DATABASE_URL`
- `NODE_ENV`
- `SECRET_KEY`

### clone

```
git clone: https://github.com/Raja28/BitBet.git
npm i concurrently
npm install
npm run dev
```
