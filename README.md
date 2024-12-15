# Next.js Inventory Management System

## Overview

This project is a simple inventory management system built with Next.js. It allows for CRUD operations on product data, updates stock based on sales and procurement, forecasts sales for the next month, calculates Reorder Point (ROP) and Economic Order Quantity (EOQ), and notifies users when stock falls below the ROP after a sale.

[Baca dalam Bahasa Indonesia](./readme_id.md)

Repository: [https://github.com/nichiyoo/nextjs-inventory](https://github.com/nichiyoo/nextjs-inventory)

## Technologies Used

-   [Next.js](https://nextjs.org/) - React framework for building web applications
-   [Bun](https://bun.sh/) - JavaScript runtime and package manager
-   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
-   [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM for SQL databases
-   [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
-   [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation
-   [Zustand](https://github.com/pmndrs/zustand) - State management
-   [Arima](https://github.com/zemlyansky/arima) - Time series forecasting

## Prerequisites

Before you begin, ensure you have the following installed:

-   [Bun](https://bun.sh/) (latest version)
-   [Git](https://git-scm.com/)

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/nichiyoo/nextjs-inventory.git
    cd nextjs-inventory
    ```

2. Install dependencies:
    ```
    bun install
    ```

## Environment Setup

1. Copy the `.env.example` file to create a new `.env` file:

    ```
    cp .env.example .env
    ```

2. Open the `.env` file and ensure it contains the following values:

    ```
    DATABASE_FILE_NAME=file:database/database.db
    NEXT_PUBLIC_APP_NAME="Hokki Frozen Food"
    ```

    You can modify the `NEXT_PUBLIC_APP_NAME` if needed.

## Database Setup

1. Push the database schema:

    ```
    bun run db:push
    ```

2. (Optional) Seed the database:
    ```
    bun run db:seed
    ```

## Running the Application

### Development Mode

To start the development server:

```
bun run dev
```

The application will be available at `http://localhost:3000`.

### Production Mode

To build and start the application for production:

1. Build the application:

    ```
    bun run build
    ```

2. Start the production server:
    ```
    bun run start
    ```

## Available Scripts

-   `bun run dev`: Start the development server
-   `bun run build`: Build the application for production
-   `bun run start`: Start the production server
-   `bun run lint`: Run ESLint
-   `bun run db:push`: Push database schema changes
-   `bun run db:migrate`: Run database migrations
-   `bun run db:generate`: Generate migration files
-   `bun run db:seed`: Seed the database
-   `bun run db:studio`: Open Drizzle Studio for database management

## Features

-   CRUD operations for product data
-   Stock updates based on sales and procurement
-   Sales forecasting for the next month
-   ROP (Reorder Point) and EOQ (Economic Order Quantity) calculations
-   User notifications when stock falls below ROP after a sale
-   User management system

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
