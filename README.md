# Assessment Project

## Overview
This project is a Next.js web application using Tailwind CSS for styling, Jest for testing, and Cypress for end-to-end testing. It also uses Prisma with an SQLite database. The application features a sidebar with two tabs: **Simulations** and **History**. The user, who is mocked within the application, can choose a training program in **Simulations** and review previous session chats in **History**.

## Technologies Used
- **Next.js** (with TurboPack for faster builds)
- **Tailwind CSS** (for styling)
- **Vitest** (for unit testing)
- **Cypress** (for end-to-end testing)
- **Prisma** (ORM for database management)
- **SQLite** (lightweight database solution)

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS version recommended)
- **Yarn or npm** (Package manager)
- **SQLite** (Bundled with Prisma, no separate installation needed)

### Steps to Run the Project
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd <project-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Run the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open the application in your browser at:
   ```sh
   http://localhost:3000
   ```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server with TurboPack |
| `npm run build` | Builds the application for production |
| `npm run start` | Runs the production server |
| `npm run lint` | Lints the codebase using ESLint |
| `npm run test` | Runs unit tests using Vitest |
| `npm run cypress:web` | Opens Cypress in interactive mode for E2E tests |
| `npm run cypress:headless` | Runs Cypress tests in headless mode |

## Features
- **Mocked User:** No authentication required; the user is predefined.
- **Sidebar Navigation:**
  - **Simulations:** Allows users to select a training program.
  - **History:** Displays previous chat logs from past simulations.
- **Prisma & SQLite Integration:** Simplifies data management and persistence.
- **Testing Suite:** Comprehensive unit and E2E testing with Vitest and Cypress.

## Database Setup
Since the project uses SQLite, the database file is included in the repository. **Running migrations is not necessary unless making schema changes.** However, if needed, you can run the following command:
```sh
npx prisma migrate dev --name init
```

## Running Tests
### Unit Tests:
```sh
npm run test
```
### End-to-End Tests:
Run Cypress in interactive mode:
```sh
npm run cypress:web
```
Run Cypress tests in headless mode:
```sh
npm run cypress:headless
```

## Deployment
To build the project for production:
```sh
npm run build
npm run start
```