## Deploy

https://cms-btrz.vercel.app/

## Instructions:##

To run on dev mode:

npx next dev -p 4200

Important!
This project auth only works well on port 4200

## Project Structure

-cms-btrz/
-pages/ # Next.js pages
... # Other pages
-api/ # API routes
-components/ # React components
-styles/ # CSS and SCSS styles
-public/ # Static assets
-.eslintrc.json # ESLint configuration
-next.config.js # Next.js configuration
-package.json # Project metadata and dependencies
-tsconfig.json # TypeScript configuration

## Dependencies

- axios: Promise-based HTTP client for making requests to APIs.
- react-hook-form: Form validation library for React.
- react-icons: Icon library for React applications.
- react-table: Lightweight and fast table library for React.
- react-toastify: Notification library for React applications.

## Features:

## Auth

- Sign Up - Create user
- Login

## Dashboard - Clients

- Retrieve client infos
- Add client notes
- Add client schedules
- Delete Client
- Export client data as JSON
- Search client by name
