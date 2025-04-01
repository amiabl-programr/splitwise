# Behance Builders - Frontend

A modern React application built with TypeScript and Vite.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Setup](#setup)
2. [Development](#development)
   - [Available Scripts](#available-scripts)
   - [Folder Structure](#folder-structure)
3. [Contributing](#contributing)
   - [Contribution Guidelines](#contribution-guidelines)
   - [Commit Message Convention](#commit-message-convention)

## Getting Started

### Prerequisites

To run this project, you need the following installed:
- [Node.js](https://nodejs.org/) (v18.19 or later)
- [npm](https://www.npmjs.com/)

### Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/amiabl-programr/behance-builders.git
    ```
   
2. **Install project dependencies:**
    ```bash
    cd behance-builders/frontend
    npm install
    ```

3. **Run the development server:**
    ```bash
    npm run dev
    ```
    Alternative package managers:
    ```bash
    # Using pnpm
    pnpm dev
    
    # Using yarn
    yarn dev
    
    # Using bun
    bun dev
    ```

4. **Open your browser to view the result:**
    - [http://localhost:5173/](http://localhost:5173/)

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run lint` - Run ESLint to check code quality
- `npm run test` - Run tests
- `npm run preview` - Preview the production build locally

### Folder Structure

```
📦 frontend
├── 📂 public                    # Static assets (e.g., icons, fonts, images)
│   ├── favicon.ico
│   ├── logo.svg
│   └── robots.txt
├── 📂 src
│   ├── 📂 components            # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   └── index.ts
│   ├── 📂 features              # Feature-based module separation
│   │   ├── auth
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── authSlice.ts      # Redux/Zustand state (if used)
│   │   │   ├── api.ts            # API calls related to authentication
│   │   │   ├── hooks.ts          # Hooks related to authentication
│   │   │   └── index.ts
│   │   ├── dashboard
│   │   │   ├── Dashboard.tsx
│   │   │   ├── dashboardSlice.ts
│   │   │   ├── api.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── 📂 hooks                 # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   └── index.ts
│   ├── 📂 layouts               # Layout components
│   │   ├── MainLayout.tsx
│   │   ├── DashboardLayout.tsx
│   │   └── index.ts
│   ├── 📂 pages                 # Page components (route-level)
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Dashboard.tsx
│   │   ├── NotFound.tsx
│   │   └── index.ts
│   ├── 📂 routes                # App routing configuration
│   │   ├── routes.tsx
│   │   └── PrivateRoute.tsx
│   ├── 📂 store                 # Global state management
│   │   ├── store.ts
│   │   └── index.ts
│   ├── 📂 services              # API services and external requests
│   │   ├── apiClient.ts
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   └── index.ts
│   ├── 📂 utils                 # Utility functions/helpers
│   │   ├── formatDate.ts
│   │   ├── localStorage.ts
│   │   ├── constants.ts
│   │   └── index.ts
│   ├── 📂 assets                # Static files like images, fonts, etc.
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   ├── 📂 config                # App-wide configurations
│   │   ├── env.ts
│   │   ├── theme.ts
│   │   └── index.ts
│   ├── 📂 styles                # Global styles and themes
│   │   ├── tailwind.css
│   │   ├── theme.css
│   │   └── index.ts
│   ├── main.tsx                 # Entry point
│   ├── App.tsx                  # Main app component
│   └── vite-env.d.ts
├── 📂 tests                     # Integration and unit tests
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── setupTests.ts
│   └── vitest.config.ts
├── .husky/                      # Husky pre-commit hooks
├── .github/                     # GitHub Actions for CI/CD
├── .vscode/                     # VS Code settings & extensions
├── .eslintrc.cjs                # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── .gitignore                   # Git ignore file
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
├── vite.config.ts               # Vite configuration
└── README.md                    # Project documentation
```

## Contributing

Contributions, issues, and feature requests are welcome!

### Contribution Guidelines

1. **Clone the repository:**
    ```bash
    git clone https://github.com/amiabl-programr/behance-builders.git
    ```

2. **Create a new branch from the `main` branch:**
    ```bash
    git checkout -b feat/feature-name
    ```
    
    Branch naming convention:
    - `feat/` - For new features
    - `fix/` - For bug fixes
    - `docs/` - For documentation changes
    - `refactor/` - For code refactoring
    - `test/` - For adding or updating tests

3. **Ensure your branch is up to date with the `main` branch:**
    ```bash
    git pull origin main
    ```

4. **Make your changes, then add them:**
    ```bash
    git add .
    ```

5. **Commit your changes with a descriptive message:**
    ```bash
    git commit -m "feat: add user authentication"
    ```

6. **Ensure there are no conflicts:**
    ```bash
    git pull origin main
    ```

7. **Push your changes to the new branch:**
    ```bash
    git push -u origin feat/feature-name
    ```

8. **Create a pull request:**
    - Provide a detailed description of your pull request following the pull request template.
    - Link any related issues.

### Commit Message Convention

We follow conventional commit messages to make the commit history more readable and to automate versioning.

| Type     | Description                                                                                                 |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| feat     | A new feature you're adding                                                                                 |
| fix      | A bug fix                                                                                                   |
| docs     | Documentation only changes                                                                                  |
| style    | Features and updates relating to styling                                                                    |
| refactor | Code change that neither fixes a bug nor adds a feature                                                     |
| perf     | Code change that improves performance                                                                       |
| test     | Adding missing tests or correcting existing tests                                                           |
| build    | Changes that affect the build system or external dependencies                                               |
| ci       | Changes to our CI configuration files and scripts                                                           |
| chore    | Other changes that don't modify source or test files                                                        |
| revert   | Reverts a previous commit                                                                                   |

#### Sample Commit Messages
- `feat: add user authentication` - Used when adding a new feature
- `fix: resolve login button not working` - Used when fixing a bug
- `docs: update API documentation` - Used when updating documentation