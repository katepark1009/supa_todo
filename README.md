# Supabase & Next.js Demo Project

This is a demo project to showcase the integration of Supabase and Next.js. The project demonstrates how to use Supabase for backend services and Next.js for frontend development, including user authentication, database operations, and real-time data updates.

## Features

- User Authentication (Sign Up, Sign In, Sign Out)
- CRUD operations with Supabase
- Real-time data updates
- Responsive UI with Next.js
- Material Tailwind Component

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn
    ```

3. Set up environment variables:
    Create a `.env.local` file in the root directory and add your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

4. Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- Sign up for a new account or sign in with an existing account.
- Add, edit, and delete tasks in the todo list.

## Project Structure

- `pages/`: Contains the Next.js pages.
- `components/`: Contains the React components.
- `utils/`: Contains utility functions and Supabase client setup.
- `styles/`: Contains the CSS styles.

## Acknowledgements

- [Supabase](https://supabase.io/)
- [Next.js](https://nextjs.org/)